export default interface IQueueRepository {

    publish(exchange: string, key: string, contentType: string, data: object): Promise<void>;
}