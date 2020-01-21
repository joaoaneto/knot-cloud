/* eslint-disable no-console */
import yargs from 'yargs';
import { Storage } from '@cesarbr/knot-cloud-sdk-js';
import options from './utils/options';

const ListData = async (args) => {
  const client = new Storage({
    hostname: args.server,
    port: args.port,
    id: "", // Storage SDK still requires an id but it's not necessary anymore
    token: args.token,
  });

  const response = await client.listData();
  console.log(response)
};

yargs
  .command({
    command: 'list-data',
    desc: 'List things data',
    builder: (_yargs) => {
      _yargs
        .options(options)
    },
    handler: async (args) => {
      await ListData(args);
    },
  });
