/* eslint-disable no-console */
import yargs from 'yargs';
import { Client } from '@cesarbr/knot-cloud-sdk-js';
import isBase64 from 'is-base64';
import options from './utils/options';

const publishData = async (args) => {
  const client = new Client({
    hostname: args.server,
    port: args.port,
    token: args.token,
    username: args.username,
    password: args.password,
    protocol: args.protocol,
  });

  const data = [{ sensorId: args.sensorId, value: args.value }]
  await client.connect();
  const result = await client.publishData(args.thingId, data);
  console.log(result)
  await client.close();
};

yargs
  .command({
    command: 'publish-data <thing-id> <sensor-id> <value>',
    desc: 'Publish <value> as a <sensor-id>',
    builder: (_yargs) => {
      _yargs
        .options(options)
        .positional('sensor-id', {
          describe: 'ID of the sensor that is publishing the data',
        })
        .positional('value', {
          describe: 'Value to be published. Supported types: boolean, number or Base64 strings.',
          coerce: (value) => {
            if (isNaN(value)) { // eslint-disable-line no-restricted-globals
              if (value === 'true' || value === 'false') {
                return (value === 'true');
              }
              if (!isBase64(value)) {
                throw new Error('Supported types are boolean, number or Base64 strings');
              }
              return value;
            }

            return parseFloat(value);
          },
        });
    },
    handler: async (args) => {
      await publishData(args);
    },
  });
