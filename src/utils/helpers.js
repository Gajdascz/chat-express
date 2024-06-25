import { readdir } from 'node:fs/promises';
import path from 'node:path';
import createDebug from 'debug';
import { DateTime } from 'luxon';

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
    console.err(err);
  }
};

// Common
const capitalize = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
const formatTimestamp = (isoTimeStamp) => DateTime.fromISO(isoTimeStamp).toLocaleString(DateTime.DATETIME_SHORT);
const camelCase = (str) =>
  str.toLowerCase().replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''));
// hbs
const handlebarsHelpers = {
  capitalize,
  formatTimestamp,
  default: (provided, fallback) => provided ?? fallback,
  camelCase,
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

export { getDebug, getSubDirectories, capitalize, formatTimestamp, handlebarsHelpers, getHbsChatboxContext, camelCase };
