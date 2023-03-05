import {
  Body,
  Controller,
  Delete,
  Get,
  OnModuleInit,
  Param,
  Post,
} from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { ApiBody } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { Carts } from './carts.interface';
import { CartsDto } from './carts.dto';
import { Products } from './products.interface';
import { ProductsDto } from './products.dto';

@Controller('carts')
export class CartsController implements OnModuleInit {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'shopping-cart',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'shopping-cart-consumer',
        allowAutoTopicCreation: true,
      },
    },
  })
  private client: ClientKafka;

  async onModuleInit() {
    const requestPatters = [
      'find-all-carts',
      'create-cart',
      'create-product',
      'delete-product',
    ];

    requestPatters.forEach(async (pattern) => {
      this.client.subscribeToResponseOf(pattern);
      await this.client.connect();
    });
  }

  @Get()
  findAllCarts(): Observable<Carts[]> {
    return this.client.send('find-all-carts', {});
  }

  @Post()
  @ApiBody({ type: CartsDto })
  createCart(@Body() user: CartsDto): Observable<Carts> {
    return this.client.send('create-cart', user);
  }

  @Post('/addProduct')
  @ApiBody({ type: ProductsDto })
  createProduct(@Body() product: ProductsDto): Observable<Products> {
    return this.client.send('create-product', product);
  }

  @Delete('/removeProduct/:id')
  deleteProduct(@Param('id') id: number) {
    return this.client.emit('delete-product', { id });
  }
}
