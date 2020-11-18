import amqp, { Connection } from 'amqplib'
import Debug from 'debug';
import { IQueueRepository } from 'src/interfaces';
class RabbitRepository implements IQueueRepository {

    private readonly _debug: Debug.Debugger = Debug('rabbit-repo');
    private _connection: Connection | null;

    constructor() {
        this._debug('constructor');

        this._connection = null;
    }

    async init() {
        this._debug('init')

        if (process.env.RABBIT_URL) {
            this._connection = await amqp.connect(process.env.RABBIT_URL);
        } else {
            this._debug('undefined rabbit_url')
        }

        if(this._connection) {
            this._debug("Connection Successful")
        }
    }

    async publish(exchange: string, key: string, contentType: string, data: object): Promise<void> {

        if (this._connection === null) {
            this._debug('Connection undefined')
            return;
        }

        const channel = await this._connection.createChannel();

        if (channel) {
            this._debug('created channel');

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