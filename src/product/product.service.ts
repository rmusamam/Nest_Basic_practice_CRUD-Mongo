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
    
    console.log('title in : ',id);
    
    const productFindById=await this.product.findOne({title:id})
    console.log('data by title in mongoDB : ',productFindById)
    if(!productFindById){
      throw new HttpException('not found',404)
    }
    
    return `This Id: #${id} returned the Product: ${productFindById}`;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    console.log('update data: ',updateProductDto,'and id is : ',id)
    const productUpdate= await this.product.findByIdAndUpdate({_id:id},{title:updateProductDto.title})
    console.log('the updated product: ',productUpdate)
    return `This action updates a #${id} product: ${productUpdate}`;
  }

  async remove(id: string) {
    
    const deleteProduct= await this.product.findByIdAndDelete({_id: id})
    console.log('deleted product: ',deleteProduct);
    if(!deleteProduct){
      throw new HttpException('Error to delete record',404)
    }
    return `This action removes a #${id} product: ${deleteProduct} `;
  }
}
