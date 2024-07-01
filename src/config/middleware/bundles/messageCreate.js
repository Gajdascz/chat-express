import asyncHandler from 'express-async-handler';
import isLoggedIn from '../authentication/isLoggedIn.js';
import User from '../../../models/User.js';
import Message from '../../../models/Message.js';
import { TextCensor, RegExpMatcher, englishDataset, englishRecommendedTransformers } from 'obscenity';

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

export default [
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
    return res.status(200).json({ newMessage: message, redirect: '/' });
  }),
];
