import { IQueueRepository, IEventsRepository} from "src/interfaces";

export class PublishService {

    private readonly _queue: IQueueRepository;
    private readonly _events: IEventsRepository;

    constructor(queue: IQueueRepository, events: IEventsRepository) {
        this._queue = queue;
        this._events = events;
    }

    onPublish(key: string): void {

        const event = this._events.getByKey(key);

        console.log(event);
    }
}