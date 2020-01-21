/* eslint-disable no-console */
import yargs from 'yargs';
import { Authenticator } from '@cesarbr/knot-cloud-sdk-js';
import options from './utils/options';

const createUser = async (args) => {
  const client = new Authenticator({
    hostname: args.server,
    port: args.port,
    protocol: args.protocol,
  });

  const response = await client.createUser(args.email, args.password);
  console.log(response)
};

yargs
  .command({
    command: 'create-user <email> <passowrd>',
    desc: 'Create a new user',
    builder: (_yargs) => {
      _yargs
        .options(options)
    },
    handler: async (args) => {
      await createUser(args);
    },
  });
