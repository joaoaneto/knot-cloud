/* eslint-disable no-console */
import yargs from 'yargs';
import { Client } from '@cesarbr/knot-cloud-sdk-js';
import options from './utils/options';

const deleteThing = async (args) => {
  const client = new Client({
    hostname: args.server,
    port: args.port,
    token: args.token,
    username: args.username,
    password: args.password,
    protocol: args.protocol,
  });

  await client.connect();
  const result = await client.unregister(args.id);
  console.log(result)
  await client.stop();
};

yargs
  .command({
    command: 'delete-thing <id>',
    desc: 'Delete thing <id>',
    builder: (_yargs) => {
      _yargs
        .options(options)
    },
    handler: (args) => {
      deleteThing(args);
    },
  });
