import { Argv } from 'yargs';

export const command: string = 'add <command>';
export const aliases: string[] = ['a'];
export const describe: string = 'Add rabbit event';

export const builder = (yargs: any) => {
    return yargs.options({
        key: { type: 'string', demandOption: true, describe: 'Event routing key', alias: 'k'},
        exchange: { type: 'string', demandOption: true, describe: 'Exchange to publish event', alias: 'ex'},
        alias: { type: 'string', demandOption: true, describe: 'Alias for the key', alias: 'a'},
        data: { type: 'string', demandOption: true, describe: 'Event data', alias: 'd'},
        options: { type: 'string', demandOption: false, describe: 'Publish options such as headers and content type', alias: 'o'}
    })
}

export const handler = (yargs: Argv) => {
    console.log('add handler');
}
