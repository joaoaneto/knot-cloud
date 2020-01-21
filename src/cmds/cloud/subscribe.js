/* eslint-disable no-console */
import yargs from 'yargs';
import { Client } from '@cesarbr/knot-cloud-sdk-js';
import options from './utils/options';

const subscribe = async (args) => {
  const client = new Client({
    hostname: args.server,
    port: args.port,
    token: args.token,
    username: args.username,
    password: args.password,
    protocol: args.protocol,
  });

  await client.connect();
  await client.on(args.event, (event) => {
    console.log(event);
  });
  await client.stop();
};

yargs
  .command({
    command: 'on <event>',
    desc: 'Subscribe to receive events',
    builder: (_yargs) => {
      _yargs
        .options(options);
    },
    handler: async (args) => {
      await subscribe(args);
    },
  });
