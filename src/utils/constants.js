import path from 'node:path';

const SUCCESS = `\x1b[32mSuccess`;
const FAIL = `\x1b[31mFail`;

const P_ROOT = path.resolve(import.meta.dirname, '../..');
const P_SRC = path.join(P_ROOT, 'src');
const P_PUBLIC = path.join(P_SRC, 'public');
const P_VIEWS = {
  MAIN: path.join(P_SRC, 'views'),
  LAYOUTS: path.join(P_SRC, 'views', 'layouts'),
  PARTIALS: path.join(P_SRC, 'views', 'partials'),
};
export { SUCCESS, FAIL, P_ROOT, P_SRC, P_PUBLIC, P_VIEWS };
