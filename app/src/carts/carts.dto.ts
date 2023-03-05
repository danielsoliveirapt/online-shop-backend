import { ApiProperty } from '@nestjs/swagger';
export class CartsDto {
  @ApiProperty()
  shoppingCartId: number;

  @ApiProperty()
  totalPrice: number;

  @ApiProperty()
  totalQuantity: number;

  @ApiProperty()
  userId: string;
}
