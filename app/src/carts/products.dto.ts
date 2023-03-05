import { ApiProperty } from '@nestjs/swagger';
export class ProductsDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  price: number;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  productId: string;

  @ApiProperty()
  cartShoppingCartId: number;
}
