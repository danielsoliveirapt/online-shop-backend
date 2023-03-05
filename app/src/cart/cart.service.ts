/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Cart } from './Cart';
import { CartDto } from './CartDto';

@Injectable()
export class CartService {
  private cart: Cart[] = [
    {
      id: 1,
      totalPrice: 200,
      totalQuantity: 2,
    },
    {
      id: 2,
      totalPrice: 300,
      totalQuantity: 2,
    },
  ];

  findAll() {
    return this.cart.filter(Boolean);
  }

	async findById(id: number) {
    const cart = this.cart.find((cart) => cart?.id === id);

		if(!cart){
			throw Error(`Carrinho de compras ID '${id}' não encontrado.`);
		}

		return cart;
  }

	create(cartDto: CartDto) {
    const id = this.cart.length + 1;
    const cart : Cart =  {
      id,
      ...cartDto
    }

    this.cart.push(cart)

    return cart;
  }

	async update(id: number, cartDto: CartDto) {
    const index = this.cart.findIndex((c) => c?.id === id)

    if(index < 0){
			throw Error(`Carrinho de compras ID '${id}' não encontrado.`);
		}

    const cart : Cart =  {
      id,
      ...cartDto
    }

		this.cart[index] = cart;
		return cart;
  }

	async delete(id: number) {
    const index = this.cart.findIndex((c) => c?.id === id)
    //console.log({index});
    if(index < 0){
			throw Error(`Carrinho de compras ID '${id}' não encontrado.`);
		}

		delete this.cart[index];
  }
}
