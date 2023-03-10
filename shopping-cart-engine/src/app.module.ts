import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './carts.entity';
import { ProductEntity } from './products.entity';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([CartEntity, ProductEntity]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
