import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from '../carts.entity';
import { ProductEntity } from '../products.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: 'postgres',
      password: 'shop',
      database: 'shop',
      entities: [CartEntity, ProductEntity],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
