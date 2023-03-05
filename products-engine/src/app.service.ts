import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './app.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
  ) {}

  async findAllProducts(): Promise<Product[]> {
    return await this.productModel.find().exec();
  }
}
