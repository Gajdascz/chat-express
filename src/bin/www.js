#!/usr/bin/env node

import app from '../app.js';
import createDebug from 'debug';
import http from 'http';

const normalizePort = (givenPort) => {
  const port = parseInt(givenPort, 10);
  if (isNaN(port)) return givenPort;
  if (port >= 0) return port;
  return false;
};

const onError = (err) => {
  if (err.syscall !== 'listen') throw err;
  const bind = typeof port === 'string' ? 'Pipe' + port : 'Port ' + port;
  switch (err.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw err;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'http://localhost:' + addr.port;
  debug(`Listening on ${bind}`);
};

const debug = createDebug('chat-express:www.js');

const port = normalizePort(process.env.PORT);
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
