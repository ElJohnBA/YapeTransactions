import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { TransactionsService } from '../services/transactions.service';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

@Controller()
export class TransactionsController {

  constructor(private readonly transactionsService: TransactionsService,
    private eventEmitter: EventEmitter2) {}

  @EventPattern('transactionsyape') 
  transactionEvent(@Payload() eventMessage) {
    Logger.debug(eventMessage, 'TransactionsController - transactionEvent');
    this.eventEmitter.emit(eventMessage.eventType, eventMessage);
  }

  @OnEvent('TransactionCreated')
  handleCreatedTransaction(createTransactionDto: CreateTransactionDto) {
    Logger.debug(createTransactionDto,
      'ServicesController - handleServiceCreatedEvent');

    this.transactionsService.createTransaction(createTransactionDto);
  }

  @OnEvent('TransactionUpdated')
  handleUpdatedEvent(updateTransactionDto: UpdateTransactionDto) {
    Logger.debug(
      updateTransactionDto,
      'ServicesController - handleServiceUpdatedEvent',
    );
  }

  @OnEvent('TransactionDeleted')
  handleServiceDeletedEvent(deleteServiceDto: any) {
    Logger.debug(
      deleteServiceDto,
      'ServicesController - handleServiceDeletedEvent',
    );
  }

}
