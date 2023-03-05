import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
//import { TypeOrmModule } from '@nestjs/typeorm';
import { CartsModule } from './carts/carts.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    UsersModule,
    CartsModule,
    ProductsModule,
    /*TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'shop',*/
    //entities: [__dirname + './**/*.entity{.ts,.js}'],
    /*synchronize: true,
      autoLoadEntities: true,
    }),*/
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
