import { IQueueRepository } from "src/interfaces";

class RabbitRepository implements IQueueRepository {

    constructor() {
        console.log('rabbit repository constructor')
    }

    async publish(exchange: string, key: string, data: object): Promise<void> {

        return;
    }
}

export default new RabbitRepository();