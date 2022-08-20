import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product,ProductDocument } from './schemas/product.schema';


@Injectable()
export class ProductService {

  constructor(@InjectModel('Product') private product:Model<ProductDocument>) { }
 
  async create(createProductDto: CreateProductDto):Promise<Product> {
  const product = await new this.product(createProductDto)                           ;
  
  if(!product){
    console.log('the new product could not saved:',product)
    throw new HttpException('Error',404)
  }
  const savedProduct= product.save()
  console.log('this is new saved data',savedProduct)
   return savedProduct;
    // return (createProductDto);
  }

  async findAll() {
    const productFind= await this.product.find().exec()
    console.log('finding product: ',productFind);
    
    if(!productFind || !productFind[0])
    {
     throw new HttpException('not handled', 404)
    }
    return productFind;
  }

  async findOne(id: string) {
    
    const productFindById=await this.product.findOne({id}).exec()
    if(!productFindById){
      throw new HttpException('not found',404)
    }

    return `This Id: #${id} returned the Product: ${productFindById}`;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const productUpdate= await this.product.updateOne({id},{updateProductDto})
    return `This action updates a #${id} product: ${productUpdate}`;
  }

  async remove(id: number) {
    const deleteProduct= await this.product.deleteOne({id}).exec()
    if(deleteProduct.deletedCount == 0){
      throw new HttpException('Error to delete record',404)
    }
    return `This action removes a #${id} product: ${deleteProduct} `;
  }
}
