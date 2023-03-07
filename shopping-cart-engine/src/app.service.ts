import { Injectable, NotFoundException } from '@nestjs/common';
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

    @InjectRepository(ProductEntity)
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
    return await this.cartRepository.save(cart).catch((e) => {
      throw new NotFoundException(e.cart);
    });
  }

  async createProduct(product: Product): Promise<ProductEntity> {
    const productSave = await this.productRepository.save(product);
    //atualiza os campos totalPrice e totalQuantity do carrinho de compras
    const totals = await ProductEntity.createQueryBuilder('products')
      .select('SUM(quantity)', 'quantity')
      .addSelect('SUM(price)', 'price')
      .where('"cartShoppingCartId" = :id', {
        id: productSave.cartShoppingCartId,
      })
      .getRawOne();

    await ProductEntity.createQueryBuilder('products')
      .update(CartEntity)
      .set({
        totalQuantity: totals.quantity,
        totalPrice: totals.price,
      })
      .where('shoppingCartId = :id', { id: productSave.cartShoppingCartId })
      .execute();

    return productSave;
  }

  async deleteProduct(id: number) {
    const queryProduct = await ProductEntity.createQueryBuilder('products')
      .select('"cartShoppingCartId"', 'cartShoppingCartId')
      .where('id=:id', { id: id })
      .getRawOne();
    if (!queryProduct) {
      return 'No Record Found';
    } else {
      await this.productRepository.delete({ id });

      const totals = await ProductEntity.createQueryBuilder('products')
        .select('SUM(quantity)', 'quantity')
        .addSelect('SUM(price)', 'price')
        .where('"cartShoppingCartId" = :id', {
          id: queryProduct.cartShoppingCartId,
        })
        .getRawOne();

      await ProductEntity.createQueryBuilder('products')
        .update(CartEntity)
        .set({
          totalQuantity: totals.quantity,
          totalPrice: totals.price,
        })
        .where('shoppingCartId = :id', { id: queryProduct.cartShoppingCartId })
        .execute();

      return 'Record Successful Deleted';
    }
  }
}
