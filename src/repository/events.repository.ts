import { readFileSync } from 'fs';
import Debug from 'debug';
import { IEventsRepository, IEvent } from '../interfaces';

class EventsRepository implements IEventsRepository {

    private readonly _debug: Debug.Debugger = Debug('events-repo');
    private readonly _eventsMap: Map<string, IEvent>;

    constructor() {

        let rawEvents;

        this._debug('constructor');

        if(process.env.EVENT_CLI_FILE_LOCATION && typeof process.env.EVENT_CLI_FILE_LOCATION === 'string') {

            try {
                let rawdata = readFileSync(process.env.EVENT_CLI_FILE_LOCATION, {
                    encoding: 'utf8',
                });
    
                rawEvents = JSON.parse(rawdata)
            } catch (error) {
                this._debug(error);
            }
        } else {
            this._debug('EVENT_CLI_FILE_LOCATION not set properly');
        }

        this._eventsMap = new Map(rawEvents);
    }

    getAll(keys: string[]) {

        let events: IEvent[] = [];

        for(let i = 0; i < keys.length; i++) {

            let event = this.getByKey(keys[i]);

            if(event == null) {
                this._debug('getall null event', keys[i]);
                continue;
            }

            events.push(event);
        }

        return events;
    }

    getByKey(key: string): IEvent | null {

        return this._eventsMap.get(key) || null;
    }
}

export default new EventsRepository();