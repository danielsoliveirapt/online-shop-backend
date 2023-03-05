import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { CartEntity } from './carts.entity';

@Entity()
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  productId!: string;

  @Column()
  price!: number;

  @Column()
  quantity!: number;

  @Column()
  cartShoppingCartId!: number;

  @ManyToOne(() => CartEntity, (cart) => cart.products)
  cart: CartEntity;
}
