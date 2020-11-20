
import IEvent from './IEvent';

export default interface IEventsRepository {

    getAll(keys: string[]): IEvent[];
    getByKey(key: string): IEvent | null;
}
