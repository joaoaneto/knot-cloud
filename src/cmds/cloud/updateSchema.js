/* eslint-disable no-console */
import yargs from 'yargs';
import fs from 'fs';
import { Client } from '@cesarbr/knot-cloud-sdk-js';
import options from './utils/options';
import AMQPConnection from './network/AMQPConnection';

const getFileSchema = (filePath) => {
  const rawData = fs.readFileSync(filePath);
  const schema = JSON.parse(rawData);
  return {
    'sensor-id': schema.sensorId,
    'value-type': schema.valueType,
    unit: schema.unit,
    'type-id': schema.typeId,
    name: schema.name,
  };
};


const updateSchema = async (args) => {
  const client = new Client({
    hostname: args.server,
    port: args.port,
    token: args.token,
    username: args.username,
    password: args.password,
    protocol: args.protocol,
  });

  const schema = {
    sensorId: args.sensorId,
    valueType: args.valueType,
    unit: args.unit,
    typeId: args.typeId,
    name: args.name,
  };

  await client.connect();
  const result = await client.updateSchema(args.thingId, [schema]);
  console.log(result);
  await client.stop();
};


yargs
  .config('schema-file', path => getFileSchema(path))
  .command({
    command: 'update-schema <thing-id> [sensor-id] [value-type] [unit] [type-id] [name]',
    desc: 'Update a thing schema',
    builder: (_yargs) => {
      _yargs
        .options(options)
        .positional('sensor-id', {
          describe: 'Sensor ID',
          demandOption: false,
          default: 0,
        })
        .positional('value-type', {
          describe: 'Semantic value type (voltage, current, temperature, etc)',
          demandOption: false,
          default: 3,
        })
        .positional('unit', {
          describe: 'sensor unit (V, A, W, W, etc)',
          demandOption: false,
          default: 0,
        })
        .positional('type-id', {
          describe: 'data value type (boolean, integer, etc)',
          demandOption: false,
          default: 65521,
        })
        .positional('name', {
          describe: 'Sensor name',
          demandOption: false,
          default: 'Development Thing',
        });
    },
    handler: (args) => {
      updateSchema(args);
    },
  });
