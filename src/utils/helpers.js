import createDebug from 'debug';

const getDebug = (namespace) => createDebug(`members-only:${namespace}`);

export { getDebug };
