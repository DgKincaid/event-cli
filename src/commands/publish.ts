import { Argv } from 'yargs';

export const command: string = 'publish';
export const aliases: string[] = ['p'];
export const describe: string = 'Publish rabbit event';

export const builder = (yargs: any) => {
    return yargs.options({
        key: { type: 'string', demandOption: true, describe: 'Event routing key', alias: 'k'}
    })
}

export const handler = (yargs: Argv) => {
    // console.log('publish handler', yargs);
}
