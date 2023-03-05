import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { ProductEntity } from './products.entity';

@Entity()
export class CartEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  shoppingCartId: number;

  @Column()
  totalPrice: number;

  @Column()
  totalQuantity: number;

  @Column()
  userId: string;

  @OneToMany(() => ProductEntity, (product) => product.cart)
  products: ProductEntity[];
}
