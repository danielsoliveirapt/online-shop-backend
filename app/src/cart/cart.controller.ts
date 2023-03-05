import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Cart } from './Cart';
import { CartService } from './cart.service';
import { CartDto } from './CartDto';

@Controller('cart')
export class CartController {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(private cartServices: CartService) {}

  @Get()
  findAll() {
    return this.cartServices.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id) {
    return this.cartServices.findById(id).catch((e) => {
      throw new NotFoundException(e.cart);
    });
  }

  @Post()
  create(@Body() cartDto: CartDto) {
    return this.cartServices.create(cartDto);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id, @Body() cartDto: CartDto) {
    return this.cartServices.update(id, cartDto).catch((e) => {
      throw new NotFoundException(e.cart);
    });
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id) {
    return this.cartServices.delete(id).catch((e) => {
      throw new NotFoundException(e.cart);
    });
  }
}
