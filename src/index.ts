import { config } from 'dotenv';
config();

import ora from 'ora';
import yargs from 'yargs';

import * as PublishCommand from './commands/publish';
import * as AddCommand from './commands/add';

import RabbitRepository from './repository/rabbit.repository';
import EventsRepository from './repository/events.repository';

import { PublishService } from './publish/publish.service';

const args = yargs
    .command(PublishCommand)
    .command(AddCommand)
    .help()
    .argv;

// const spinner = ora('Running test: ').start();

console.log(args);

const publish = new PublishService(RabbitRepository, EventsRepository);

if (args.key && typeof args.key === 'string') {
    publish.onPublish(args.key);
}

// 
// setTimeout(() => {
//     spinner.stop();
// }, 5000);