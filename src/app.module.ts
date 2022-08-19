import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({

  controllers: [AppController],
  providers: [AppService],
  imports: [ProductModule,MongooseModule.forRoot('mongodb://localhost/nest',{dbName: 'studentdb'})],

})
export class AppModule {}
