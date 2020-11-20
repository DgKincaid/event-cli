#!/usr/bin/env node

import { config } from 'dotenv';
config();

import Debug from 'debug';
import ora from 'ora';
import yargs from 'yargs';

import * as PublishCommand from './commands/publish';
import * as AddCommand from './commands/add';

import RabbitRepository from './repository/rabbit.repository';

import EventsRepository from './repository/events.repository';

import { PublishService } from './publish/publish.service';

const debug = Debug('event-cli');

const args = yargs
    .command(PublishCommand)
    // .command(AddCommand)
    .help()
    .argv;

const spinner = ora('Running test: ').start();

(async () => {
    debug('Starting');

    try { 
        await RabbitRepository.init();

        const publish = new PublishService(RabbitRepository, EventsRepository);
    
        if (args.keys && Array.isArray(args.keys)) {
            await publish.onPublish(args.keys);
        }
    } catch (e) {
        
    }
    
    RabbitRepository.deconstructor();

    spinner.stop();
    process.exit(0);
})();
