import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CartEntity } from './carts.entity';
import { ProductEntity } from './products.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private readonly logger = new Logger(AppController.name);

  @MessagePattern('find-all-carts')
  async findAllCarts(): Promise<CartEntity[]> {
    return this.appService.findAllCarts();
  }

  @MessagePattern('create-cart')
  async createCart(@Payload() data: any): Promise<CartEntity> {
    this.logger.log(`Cart: ${JSON.stringify(data)}`);
    return await this.appService.createCart(data);
  }

  @MessagePattern('create-product')
  async createProduct(@Payload() data: any): Promise<ProductEntity> {
    this.logger.log(`Product: ${JSON.stringify(data)}`);
    return await this.appService.createProduct(data);
  }

  @MessagePattern('delete-product')
  async deleteProduct(@Payload() data: any): Promise<void> {
    return this.appService.deleteProduct(Number(data.id));
  }
}
