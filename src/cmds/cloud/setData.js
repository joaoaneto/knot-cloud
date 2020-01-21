/* eslint-disable no-console */
import yargs from 'yargs';
import { Client } from '@cesarbr/knot-cloud-sdk-js';
import isBase64 from 'is-base64';
import options from './utils/options';

const setData = async (args) => {
  const client = new Client({
    hostname: args.server,
    port: args.port,
    token: args.token,
    username: args.username,
    password: args.password,
    protocol: args.protocol,
  });

  await client.connect();
  const result = await client.setData(args.thingId, [{
    sensorId: args.sensorId,
    value: args.value,
  }]);
  console.log(result)
  await client.stop();
};

yargs
  .command({
    command: 'set-data <thing-id> <sensor-id> <value>',
    desc: 'Set data to a thing',
    builder: (_yargs) => {
      _yargs
        .options(options)
        .positional('thing-id', {
          describe: 'Thing ID',
        })
        .positional('sensor-id', {
          describe: 'ID of the sensor to be updated',
        })
        .positional('value', {
          describe: 'Value to set the sensor to. Supported types: boolean, number or Base64 strings.',
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
      await setData(args);
    },
  });
