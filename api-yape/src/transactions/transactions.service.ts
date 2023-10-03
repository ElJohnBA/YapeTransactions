import { Inject, Injectable } from '@nestjs/common';
import { Producer } from '@nestjs/microservices/external/kafka.interface';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';


@Injectable()
export class TransactionsService {

  constructor(@Inject('KAFKA_PRODUCER') private kafkaProducer: Producer) {}

  create(createServiceDto: CreateTransactionDto) {
    const id = Math.floor(Math.random() * 100);
    this.sendKafkaEvent(`${id}`, {
      eventType: 'ServiceUpdated',
      id,
      ...createServiceDto,
    });
    return 'This action adds a new service';
  }

  findAll() {
    return `This action returns all services`;
  }

  findOne(id: number) {
    return `This action returns a #${id} service`;
  }

  update(id: number, updateServiceDto: UpdateTransactionDto) {
    updateServiceDto.id = id;
    this.sendKafkaEvent(`${id}`, {
      eventType: 'ServiceUpdated',
      ...updateServiceDto,
    });
    return `This action updates a #${id} service`;
  }

  remove(id: number) {
    this.sendKafkaEvent(`${id}`, { eventType: 'ServiceDeleted', id });
    return `This action removes a #${id} service`;
  }

  sendKafkaEvent(key, value) {
    this.kafkaProducer.send({
      topic: 'services',
      messages: [{ key, value: JSON.stringify(value) }],
    });
  }
}