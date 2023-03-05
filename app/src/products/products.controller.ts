import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Products } from './products.interface';

@Controller(['products'])
export class ProductsController implements OnModuleInit {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'products',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'products-consumer',
        allowAutoTopicCreation: true,
      },
    },
  })
  private client: ClientKafka;

  async onModuleInit() {
    const requestPatters = ['find-all-products'];

    requestPatters.forEach(async (pattern) => {
      this.client.subscribeToResponseOf(pattern);
      await this.client.connect();
    });
  }

  @Get()
  findAllProducts(): Observable<Products[]> {
    return this.client.send('find-all-products', {});
  }
}
