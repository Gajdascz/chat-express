import { readdir } from 'node:fs/promises';
import path from 'node:path';
import createDebug from 'debug';
import { DateTime } from 'luxon';
import { P_VIEWS } from './constants.js';

// Server
const getDebug = (namespace) => createDebug(`members-only:${namespace}`);
const getSubDirectories = async (baseDir, includeBase = false) => {
  try {
    const dirEntries = await readdir(baseDir, { withFileTypes: true, recursive: true });
    const subDirs = dirEntries
      .filter((entry) => entry.isDirectory())
      .map((entry) => path.join(entry.parentPath, entry.name));
    if (includeBase) subDirs.push(baseDir);
    return subDirs;
  } catch (err) {
    throw err;
  }
};

// Common
const capitalize = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
const formatTimestamp = (isoTimeStamp) => DateTime.fromISO(isoTimeStamp).toLocaleString(DateTime.DATETIME_SHORT);

// hbs
const handlebarsHelpers = {
  capitalize,
  formatTimestamp,
  default: (provided, fallback) => provided ?? fallback,
};
const getHbsChatboxContext = (overrides) => ({
  id: 'chatbox-textarea',
  name: 'chatbox-textarea',
  textarea: true,
  placeholder: 'Enter your message here',
  label: 'Message',
  hideLabel: true,
  rightButton: { text: 'Send' },
});

export { getDebug, getSubDirectories, capitalize, formatTimestamp, handlebarsHelpers, getHbsChatboxContext };
