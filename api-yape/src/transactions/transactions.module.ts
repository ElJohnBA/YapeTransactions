import { Module } from '@nestjs/common';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CLIENT_KAFKA',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'transactions-yape',
            brokers: ['host.docker.internal:9094'],
          },
          consumer: {
            groupId: 'transactions-yape',
          },
        },
      },
    ]),
  ],
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    {
      provide: 'KAFKA_PRODUCER',
      useFactory: async (kafkaClient: ClientKafka) => {
        return kafkaClient.connect();
      },
      inject: ['CLIENT_KAFKA'],
    },
  ],
})
export class TransactionsModule {}