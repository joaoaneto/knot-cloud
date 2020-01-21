/* eslint-disable no-console */
import yargs from 'yargs';
import { Client } from '@cesarbr/knot-cloud-sdk-js';
import options from './utils/options';

const getData = async (args) => {
  const client = new Client({
    hostname: args.server,
    port: args.port,
    token: args.token,
    username: "knot",
    password: "knot",
    protocol: "amqp",
  });

  await client.connect();
  const result = await client.getData(args.thingId, [args.sensorId]);
  console.log(result)
  await client.stop();
};

yargs
  .command({
    command: 'get-data <thing-id> <sensor-id>',
    desc: 'Requests the current value of <sensor-id> from <thing-id>',
    builder: (_yargs) => {
      _yargs
        .options(options)
        .positional('thing-id', {
          describe: 'Thing ID',
        })
        .positional('sensor-id', {
          describe: 'ID of the sensor to request the data',
        });
    },
    handler: async (args) => {
      await getData(args);
    },
  });
