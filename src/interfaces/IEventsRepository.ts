
import IEvent from './IEvent';

export default interface IEventsRepository {

    getAll(): IEvent[];
    getByKey(key: string): IEvent | null;
}
