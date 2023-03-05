import { IsNumber, IsNotEmpty } from 'class-validator';
export class CartDto {
  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;

  @IsNumber()
  @IsNotEmpty()
  totalQuantity: number;
}
