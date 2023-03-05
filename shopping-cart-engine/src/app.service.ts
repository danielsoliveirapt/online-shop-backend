import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartEntity } from './carts.entity';
import { Cart } from './carts.interface';
import { ProductEntity } from './products.entity';
import { Product } from './products.interface';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,

    @InjectRepository(CartEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async findAllCarts(): Promise<CartEntity[]> {
    return await this.cartRepository.find({
      relations: {
        products: true,
      },
    });
  }

  async createCart(cart: Cart): Promise<CartEntity> {
    return await this.cartRepository.save(cart);
  }

  async createProduct(product: Product): Promise<ProductEntity> {
    return await this.productRepository.save(product);
  }

  async deleteProduct(id: number): Promise<void> {
    await this.productRepository.delete({ id });
  }
}
