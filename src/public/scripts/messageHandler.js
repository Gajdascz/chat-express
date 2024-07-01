import handleFormSubmission from './formHandler/core/handleFormSubmission.js';

const statusMap = {
  undefined: 0,
  basic: 1,
  member: 2,
  admin: 3,
};

const parseForm = () => {
  const context = document.querySelector('input[data-chat-context]')?.value;
  if (!context) throw new Error(`messageHandler imported with no chat-context on page`);
  const messageContainer = document.querySelector('.message-container');
  if (!messageContainer) throw new Error(`No element with .message-container class found to display message.`);
  const userStatus = document.querySelector('#user-status')?.value;
  return { context, messageContainer, userStatus };
};

const fetchMessages = async (context) => {
  const response = await fetch(`/message/${context}`);
  const { messages } = await response.json();
  return messages;
};

const createElement = (type, className, textContent = null) => {
  const element = document.createElement(type);
  element.classList.add(className);
  if (textContent) element.textContent = textContent;
  return element;
};
const createAvatar = (url, className) => {
  const img = createElement('img', className);
  img.src = url;
  return img;
};

const createDeleteMessageForm = (_id) => {
  const form = createElement('form', 'delete-message-form');
  form.action = `/message/${_id}/delete`;
  form.method = 'POST';
  form.append(createElement('button', 'delete-message-button', 'X'));
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleFormSubmission(e);
  });
  return form;
};

const createMessageElements = (senderAvatar, username, title, bodyText, createdAt, userStatus, _id) => ({
  messageWrapper: createElement('div', 'message-wrapper'),
  headerWrapper: createElement('div', 'message-header-wrapper'),
  avatar: createAvatar(senderAvatar, 'message-avatar'),
  messageTitle: createElement('span', 'message-title', title),
  username:
    statusMap[userStatus] >= 2
      ? createElement('span', 'message-username', username)
      : createElement('span', 'message-username', '[redacted]'),
  bodyWrapper: createElement('div', 'message-body-wrapper'),
  bodyText: createElement('span', 'message-body-text', bodyText),
  timestamp:
    statusMap[userStatus] >= 2
      ? createElement('span', 'message-timestamp', createdAt)
      : createElement('span', 'message-timestamp', '[redacted]'),
  usernameTitleWrapper: createElement('div', 'message-username-title-wrapper'),
  deleteForm: statusMap[userStatus] === 3 ? createDeleteMessageForm(_id) : null,
});

const getMessageElement = (userStatus, { senderAvatar, senderUsername, title, createdAt, body, _id }) => {
  const {
    messageWrapper,
    headerWrapper,
    avatar,
    messageTitle,
    username,
    bodyWrapper,
    bodyText,
    timestamp,
    usernameTitleWrapper,
    deleteForm,
  } = createMessageElements(senderAvatar, senderUsername, title, body, createdAt, userStatus, _id);
  messageWrapper.append(headerWrapper, bodyWrapper);
  usernameTitleWrapper.append(username, messageTitle);
  headerWrapper.append(avatar, usernameTitleWrapper);
  if (deleteForm) headerWrapper.append(deleteForm);
  bodyWrapper.append(bodyText, timestamp);
  return messageWrapper;
};

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const { context, userStatus, messageContainer } = parseForm();
    const messages = await fetchMessages(context);
    if (messages.length === 0) messageContainer.append(`No messages found. Start the conversation!`);
    messages.forEach((msg) => {
      const element = getMessageElement(userStatus, msg);
      messageContainer.append(element);
    });
  } catch (err) {
    console.error(`messageHandler Error: ${err}`);
  }
});
