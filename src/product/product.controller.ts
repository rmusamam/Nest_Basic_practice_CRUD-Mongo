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

  @Get('readById/:id')
  findOne(@Param('id') id: string) {
    // console.log('this is id: ',id);
    const pid =id
    return this.productService.findOne(pid);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
