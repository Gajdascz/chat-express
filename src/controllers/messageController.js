import asyncHandler from 'express-async-handler';
import Message from '../models/Message.js';
import { isLoggedIn } from '../config/middleware/authentication/auth.js';
import { TextCensor, RegExpMatcher, englishDataset, englishRecommendedTransformers } from 'obscenity';
import User from '../models/User.js';
import { formatTimestamp } from '../utils/helpers.js';

const matcher = new RegExpMatcher({ ...englishDataset.build(), englishRecommendedTransformers });
const censor = new TextCensor();

const applyCensor = (req, res, next) => {
  const { messageContext } = req.body;
  const titleKey = `${messageContext}Title`;
  const bodyKey = `${messageContext}Body`;
  const title = req.body[titleKey];
  const body = req.body[bodyKey];
  const titleMatches = matcher.getAllMatches(title);
  const bodyMatches = matcher.getAllMatches(body);
  req.body[titleKey] = censor.applyTo(title, titleMatches);
  req.body[bodyKey] = censor.applyTo(body, bodyMatches);
  next();
};

const messageController = {
  getMessage: asyncHandler(async (req, res, next) => {
    const message = await Message.findById(req.params.id).exec();
    return message;
  }),
  getMessagesByContext: asyncHandler(async (req, res, next) => {
    const { context } = req.params;
    try {
      const messages = await Message.aggregate([
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
      ]).exec();
      const finalMessages = messages.map((msg) => ({ ...msg, createdAt: formatTimestamp(msg.createdAt) }));
      return res.status(200).json({ messages: finalMessages });
    } catch (err) {
      res.status(500).json({ errors: 'Failed to fetch messages' });
    }
  }),
  createMessage: [
    isLoggedIn,
    applyCensor,
    asyncHandler(async (req, res, next) => {
      const { recipientUsername, messageContext } = req.body;
      const title = req.body[`${messageContext}Title`];
      const body = req.body[`${messageContext}Body`];
      let recipientId;
      if (recipientUsername) {
        recipientId = await User.find({ username: recipientUsername }).exec();
      }
      const message = new Message({
        title,
        body,
        context: req.path.replace('/', ''),
        sender: req.user._id,
        recipient: recipientId,
      });
      await message.save();
      return res.status(200).json({ newMessage: message });
    }),
  ],
  getAllMessages: () => {},
};

export default messageController;
