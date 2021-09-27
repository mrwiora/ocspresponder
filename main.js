#! /usr/bin/env node

import ocsp from 'ocsp';
import fs from 'fs';
import pino from 'pino';
import { exit } from 'process';

'use strict';

const hostname = '0.0.0.0';
const port = '80';

const logger = pino({
  level: 'debug',
  prettyPrint: {
    colorize: true,
    translateTime: true
  }
});

try {
  var cert = fs.readFileSync("issuer-cert.pem").toString();
} catch(e) {
  logger.error(`couldn't read issuer-cert.pem`)
  exit(1)
}

try {
  var key = fs.readFileSync("issuer-key.pem").toString();
} catch(e) {
  logger.error(`couldn't read issuer-key.pem`)
  exit(1)
}

var server = ocsp.Server.create({
  cert: cert,
  key: key
});

server.addCert(43, 'good');
server.addCert(44, 'revoked', {
  revocationTime: new Date(),
  revocationReason: 'cACompromise'
});

server.listen(port, hostname, () => {
  logger.info(`Server running at http://${hostname}:${port}/`);
});