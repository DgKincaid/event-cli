#!/usr/bin/env node

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

const spinner = ora('Running test: ').start();

console.log(args);

(async () => {

    try { 
        await RabbitRepository.init();

        const publish = new PublishService(RabbitRepository, EventsRepository);
    
        if (args.key && typeof args.key === 'string') {
            await publish.onPublish(args.key);
        }
    } catch (e) {
        
    }
    
    spinner.stop();
    process.exit(0);
})();

// 
// setTimeout(() => {
//     
// }, 5000);