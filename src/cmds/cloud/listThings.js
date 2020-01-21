/* eslint-disable no-console */
import yargs from 'yargs';
import { Client } from '@cesarbr/knot-cloud-sdk-js';
import options from './utils/options';
import AMQPConnection from './network/AMQPConnection';

const buildQuery = (params) => {
  const base = {
    type: params.type,
  };

  if (params.name) {
    base.metadata = {
      name: params.name,
    };
  }

  return base;
};

const listThings = async (args) => {
  const client = new Client({
    hostname: args.server,
    port: args.port,
    token: args.token,
    username: args.username,
    password: args.password,
    protocol: args.protocol,
  });
  await client.connect();
  const result = await client.getDevices();
  console.log(result)
};

yargs
  .command({
    command: 'list-things',
    desc: 'List registered things',
    builder: (_yargs) => {
      _yargs
        .options(options);
    },
    handler: async (args) => {
      await listThings(args);
    },
  });
