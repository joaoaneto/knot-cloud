export default {
  amqpServer: {
    describe: 'Server hostname',
    demandOption: true,
    default: 'api.knot.cloud',
  },
  httpServer: {
    describe: 'Server hostname',
    demandOption: true,
    default: 'api.knot.cloud',
  },
  port: {
    describe: 'Server port',
    demandOption: true,
    default: 443,
  },
  protocol: {
    describe: 'Protocol name',
    demandOption: true,
    default: 'https',
  },
  username: {
    describe: 'User name',
    demandOption: true,
    default: 'knot',
  },
  password: {
    describe: 'Password',
    demandOption: true,
    default: 'knot',
  },
  token: {
    describe: 'User token',
    demandOption: true,
  },
};
