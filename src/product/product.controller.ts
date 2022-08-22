import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('/')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('createProducts')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get('readAllProducts')
  findAll() {
    return this.productService.findAll();
  }

  @Get('readById/:title')
  findOne(@Param('title') title: string) {
    console.log('this is title in controller: ',title);
    // const pid =title
    return this.productService.findOne(title);
  }

  @Patch('updateProduct/:id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    // console.log('update data: ',updateProductDto,'and id is : ',id)
    return this.productService.update(id, updateProductDto);
  }

  @Delete('deleteById/:id')
  remove(@Param('id') id: string) {
    console.log('deleting ID is : ',id);
    
    return this.productService.remove(id);
  }
}
