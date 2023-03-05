import { ApiProperty } from '@nestjs/swagger';
export class ProductsDto {
  @ApiProperty()
  price: number;

  @ApiProperty()
  productId: string;
}
