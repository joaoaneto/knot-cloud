/* eslint-disable no-console */
import yargs from 'yargs';
import { Client } from '@cesarbr/knot-cloud-sdk-js';
import options from './utils/options';

const authThing = async (args) => {
  const client = new Client({
    hostname: args.server,
    port: args.port,
    token: args.token,
    username: args.username,
    password: args.password,
    protocol: args.protocol,
  });

  await client.connect();
  const result = await client.authDevice(args.id);
  console.log(result)
  await client.stop();
};

yargs
  .command({
    command: 'auth-thing <id>',
    desc: 'Authenticate a thing',
    builder: (_yargs) => {
      _yargs
        .options(options)
    },
    handler: async (args) => {
      await authThing(args);
    },
  });
