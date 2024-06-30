const getRequiredElements = () => {
  const context = document.querySelector('input[data-chat-context]')?.value;
  if (!context) throw new Error(`messageHandler imported with no chat-context on page`);
  const messageContainer = document.querySelector('.message-container');
  if (!messageContainer) throw new Error(`No element with .message-container class found to display message.`);
  return { context, messageContainer };
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

const createMessageElements = (senderAvatar, username, title, bodyText, createdAt) => ({
  messageWrapper: createElement('div', 'message-wrapper'),
  headerWrapper: createElement('div', 'message-header'),
  avatar: createAvatar(senderAvatar, 'message-avatar'),
  messageTitle: createElement('span', 'message-title', title),
  username: createElement('span', 'message-username', username),
  bodyWrapper: createElement('div', 'message-body-wrapper'),
  bodyText: createElement('span', 'message-body-text', bodyText),
  timestamp: createElement('span', 'message-timestamp', createdAt),
  usernameTitleWrapper: createElement('div', 'message-username-title-wrapper'),
});

const getMessageElement = ({ senderAvatar, senderUsername, title, createdAt, body }) => {
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
  } = createMessageElements(senderAvatar, senderUsername, title, body, createdAt);
  messageWrapper.append(headerWrapper, bodyWrapper);
  usernameTitleWrapper.append(username, messageTitle);
  headerWrapper.append(avatar, usernameTitleWrapper);
  bodyWrapper.append(bodyText, timestamp);
  return messageWrapper;
};

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const { context, messageContainer } = getRequiredElements();
    const messages = await fetchMessages(context);
    if (messages.length === 0) messageContainer.append(`No messages found. Start the conversation!`);
    messages.forEach((msg) => {
      const element = getMessageElement(msg);
      messageContainer.append(element);
    });
  } catch (err) {
    console.error(`messageHandler Error: ${err}`);
  }
});
