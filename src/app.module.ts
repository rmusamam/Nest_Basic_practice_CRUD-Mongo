import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ProductModule,
    MongooseModule.forRoot('mongodb://localhost/nest', { dbName: 'studentdb' }),
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}
