import { Argv } from 'yargs';

export const command: string = 'publish';
export const aliases: string[] = ['p'];
export const describe: string = 'Publish rabbit event';

export const builder = (yargs: any) => {
    return yargs.options({
        keys: { type: 'array', demandOption: true, describe: 'Event routing key', alias: 'k'},
        times: { type: 'number', demandOption: false, describe: 'Number of times to publish events', alias: 't'}
    })
}

export const handler = (yargs: Argv) => {
    // console.log('publish handler', yargs);
}
