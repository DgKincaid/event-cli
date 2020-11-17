import { readFileSync } from 'fs';

import { IEventsRepository, IEvent } from '../interfaces';

class EventsRepository implements IEventsRepository {

    private readonly _eventsMap: Map<string, IEvent>;

    constructor() {

        let rawEvents;
        if(process.env.EVENT_CLI_FILE_LOCACTION && typeof process.env.EVENT_CLI_FILE_LOCACTION === 'string') {
            let rawdata = readFileSync(process.env.EVENT_CLI_FILE_LOCACTION, {
                encoding: 'utf8',
            });

            rawEvents = JSON.parse(rawdata)
        }

        this._eventsMap = new Map(rawEvents);
    }

    getAll() {

        return [];
    }

    getByKey(key: string): IEvent | null {

        return this._eventsMap.get(key) || null;
    }
}

export default new EventsRepository();