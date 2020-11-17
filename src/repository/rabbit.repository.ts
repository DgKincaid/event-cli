import amqp, { Connection } from 'amqplib'
import { IQueueRepository } from 'src/interfaces';

class RabbitRepository implements IQueueRepository {

    _connection: Connection | null;

    constructor() {
        console.log('rabbit repository constructor');

        this._connection = null;
    }

    async init() {
        console.log('rabbit repo init')
        // TODO: Set as env var
        this._connection = await amqp.connect('amqp://127.0.0.1/db');

        if(this._connection) {
            console.log("Connected to Queue Succefully")
        }
    }

    async publish(exchange: string, key: string, contentType: string, data: object): Promise<void> {

        // TODO: have some sort of error handling
        if (this._connection === null) return;

        const channel = await this._connection.createChannel();

        if (channel) {
            console.log('Successfully Created Channel');

            const sent = channel.publish(exchange, key, Buffer.from(JSON.stringify(data)), {
                contentType
            });

            console.log(" [x] Sent %s:'%s' to exchange %s", key, data, exchange);

            if (sent) {
                await channel.close();
                this._connection.close();
            }
        }

        return;
    }
}

export default new RabbitRepository();