#! /usr/bin/env node

import ocsp from 'ocsp';
import fs from 'fs';
import pino from 'pino';
import { exit } from 'process';
import https from 'https';

'use strict';

let config = {
  listenip: '',
  listenport: '',
  loglevel: 'info',
  issuercert: '',
  issuercertdata: '',
  issuerkey: '',
  issuerkeydata: '',
  rootcert: '',
  rootcertdata: ''
}
let configjson;

const logger = pino({
  level: config.loglevel,
  prettyPrint: {
    colorize: true,
    translateTime: true
  }
});

// try to read configfile
try {
  let configraw = fs.readFileSync('config.json');
  configjson = JSON.parse(configraw);
  // loglevel handling
  if (typeof configjson.loglevel !== 'undefined' && configjson.loglevel !== "") {
    if (configjson.loglevel === 'trace' || configjson.loglevel === 'debug' || configjson.loglevel === 'info' || configjson.loglevel === 'warn' || configjson.loglevel === 'error') {
      logger.level = configjson.loglevel
    } else {
      logger.error(`loglevel config misconfigured - allowed values: trace|debug|info|warn|error`)
      exit(1)
    }
  }
  // config consistency check
  logger.debug(`config read: ` + JSON.stringify(configjson, null, 4))
  // config listen handling
  if (typeof configjson.listenip === 'undefined' || typeof configjson.listenport === 'undefined') {
    logger.error(`listen config misconfigured`)
    exit(1)
  }
  // config issuercert handling
  if (typeof configjson.issuercert === 'undefined' || typeof configjson.issuerkey === 'undefined' || configjson.issuercert === "" || configjson.issuercert === "") {
    logger.error(`no issuer-cert/issuer-key parameters defined`)
    exit(1)
  }
  // config listen handling
  config = configjson;
} catch(e) {
  logger.error(`couldn't read config.json, check existence and consistence (jq)`)
  exit(1)
}


function callRest(url) {
  return new Promise ((resolve, reject) => {
    const options = {
      timeout: 3000,
      rejectUnauthorized: false // TODO: move to config
    };
    
    logger.info("callRest - obtaining info from " + url)

    https.get(url, options, (resp) => {
      let data = '';
    
      // A chunk of data has been received.
      resp.on('data', (chunk) => {
        data += chunk;
      });
    
      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        logger.debug("callRest - obtained data from " + url);
        resolve(data);
      });
    
    }).on("error", (err) => {
      logger.error("callRest - error: " + err.message)
    });
  });  
}


if(config.issuercert.includes("https://")){
  logger.info("reading issuer certificate from network")
  try {
    config.issuercertdata = await callRest(config.issuercert);
    config.issuerkeydata = await callRest(config.issuerkey);
    if(typeof configjson.rootcert !== 'undefined' && configjson.rootcert !== ""){
      config.rootcertdata = await callRest(config.rootcert);
    }
  } catch(e) {
    logger.error(`couldn't read cert: \"` + config.issuercert + `\" (defined in config.json) or key: \"` + config.issuerkey + `\" (defined in config.json) \n` + e)
    exit(1)
  }
} else {
  logger.info("reading issuer certificate from disk")
  try {
    config.issuercertdata = fs.readFileSync(config.issuercert).toString();
    config.issuerkeydata = fs.readFileSync(config.issuerkey).toString();
    if(typeof configjson.rootcert !== 'undefined' && configjson.rootcert !== ""){
      config.rootcertdata = fs.readFileSync(config.rootcert).toString();
    }
  } catch(e) {
    logger.error(`couldn't read cert: \"` + config.issuercert + `\" (defined in config.json) or key: \"` + config.issuerkey + `\" (defined in config.json)`)
    exit(1)
  }
}

// try to start application
var server = ocsp.Server.create({
  configobj: config
});

if(config.certdb === "memory") {
  logger.debug(`dbtype is memory - loaded certs from code`)
  server.addCert(43, 'good');
  server.addCert(44, 'revoked', {
    revocationTime: new Date(),
    revocationReason: 'cACompromise'
  });
}

server.listen(config.listenport, config.listenip, () => {
  logger.info(`Server running at http://${config.listenip}:${config.listenport}/`);
});
