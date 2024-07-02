import { readdir } from 'node:fs/promises';
import path from 'node:path';
import createDebug from 'debug';
import { DateTime } from 'luxon';

const getDebug = (namespace) => createDebug(`chatExpress:${namespace}`);
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
const persistMethods = (Schema, document, returnObj) => {
  const methods = Object.keys(Schema.methods).reduce((acc, curr) => {
    acc[curr] = document[curr].bind(document);
    return acc;
  }, returnObj);
  if (methods.initializeTimestamps) delete methods.initializeTimestamps;
  return methods;
};
const capitalize = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
const formatTimestamp = (jsDate) => DateTime.fromJSDate(jsDate).toLocaleString(DateTime.DATETIME_SHORT);
const camelCase = (str) =>
  str.toLowerCase().replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''));

export { getDebug, getSubDirectories, capitalize, formatTimestamp, camelCase, persistMethods };
