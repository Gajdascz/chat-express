import asyncHandler from 'express-async-handler';
import Message from '../models/Message.js';
import { formatTimestamp } from '../utils/helpers.js';
import { createMessage } from '../config/middleware/index.js';

const aggregateMessagesByContext = async (context) => {
  return Message.aggregate([
    { $match: { context } },
    {
      $lookup: {
        from: 'users',
        localField: 'sender',
        foreignField: '_id',
        as: 'senderDetail',
      },
    },
    { $unwind: '$senderDetail' },
    {
      $project: {
        title: 1,
        body: 1,
        context: 1,
        createdAt: 1,
        senderAvatar: '$senderDetail.avatar.thumb',
        senderUsername: '$senderDetail.username',
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ]).exec();
};

const messageController = {
  getMessage: asyncHandler(async (req, res, next) => {
    const message = await Message.findById(req.params.id).exec();
    return message;
  }),
  getMessagesByContext: asyncHandler(async (req, res, next) => {
    const { context } = req.params;
    try {
      const messages = await aggregateMessagesByContext(context);
      const finalMessages = messages.map((msg) => ({ ...msg, createdAt: formatTimestamp(msg.createdAt) }));
      return res.status(200).json({ messages: finalMessages });
    } catch (err) {
      res.status(500).json({ errors: 'Failed to fetch messages' });
    }
  }),
  postCreateMessage: createMessage,
  deleteMessage: asyncHandler(async (req, res, next) => {
    await Message.findByIdAndDelete(req.params.id);
    return res.status(200).json({ alertMsg: 'Message deleted', redirect: '/' });
  }),
};

export default messageController;
