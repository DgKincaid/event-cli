export default interface IQueueRepository {

    publish(exchange: string, key: string, data: object, options: object): Promise<void>;
}
