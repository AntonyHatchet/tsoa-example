import * as minimist from 'minimist';

export const serverName = minimist(process.argv.slice(2))['MY_POD_NAME'] || process.env.MY_POD_NAME || '';
