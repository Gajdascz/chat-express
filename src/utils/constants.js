import path from 'node:path';

const SUCCESS = `\x1b[32mSuccess`;
const FAIL = `\x1b[31mFail`;

// Paths
const P_ROOT = path.resolve(import.meta.dirname, '../..');
const P_SRC = path.join(P_ROOT, 'src');
const P_PUBLIC = path.join(P_SRC, 'public');
const P_VIEWS = {
  MAIN: path.join(P_SRC, 'views'),
  LAYOUTS: path.join(P_SRC, 'views', 'layouts'),
  PARTIALS: path.join(P_SRC, 'views', 'partials'),
};

const USER_STATUSES = { BASIC: 'basic', MEMBER: 'member', ADMIN: 'admin' };

const USER_STATUS_MAP = {
  undefined: -999,
  basic: 0,
  member: 1,
  admin: 999,
};

const FORM_SUBMITTER_CLIENT_SCRIPT = '<script src="../scripts/formSubmitter.js" type="module" defer></script>';

const AVATAR_PUBLIC_IDS = ['original', 'thumb', 'profile'];

export {
  SUCCESS,
  FAIL,
  P_ROOT,
  P_SRC,
  P_PUBLIC,
  P_VIEWS,
  USER_STATUSES,
  USER_STATUS_MAP,
  FORM_SUBMITTER_CLIENT_SCRIPT,
  AVATAR_PUBLIC_IDS,
};
