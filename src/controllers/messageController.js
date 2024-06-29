import asyncHandler from 'express-async-handler';
import Message from '../models/Message.js';
import { isLoggedIn } from '../config/middleware/authentication/auth.js';
import { TextCensor, RegExpMatcher, englishDataset, englishRecommendedTransformers } from 'obscenity';
import User from '../models/User.js';

const matcher = new RegExpMatcher({ ...englishDataset.build(), englishRecommendedTransformers });
const censor = new TextCensor();

const applyCensor = (req, res, next) => {
  const { messageTitle, messageBody } = req.body;
  const titleMatches = matcher.getAllMatches(messageTitle);
  const bodyMatches = matcher.getAllMatches(messageBody);
  req.body.messageTitle = censor.applyTo(messageTitle, titleMatches);
  req.body.messageBody = censor.applyTo(messageBody, bodyMatches);
  next();
};

const messageController = {
  getMessage: asyncHandler(async (req, res, next) => {
    const message = await Message.findById(req.params.id).exec();
    return message;
  }),
  createMessage: [
    isLoggedIn,
    applyCensor,
    asyncHandler(async (req, res, next) => {
      console.log(req.user);
      const { recipientUsername, messageContext } = req.body;
      const title = req.body[`${messageContext}Title`];
      const body = req.body[`${messageContext}Body`];
      let recipientId;
      if (recipientUsername) {
        recipientId = await User.find({ username: recipientUsername }).exec();
      }
      const message = new Message({ title, body, type: req.path, sender: req.user._id, recipient: recipientId });
      console.log(message);
    }),
  ],
  getAllMessages: () => {},
};

export default messageController;
