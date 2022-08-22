import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()

export class Product {
    @Prop({ required: true })
    id: String;

    @Prop() 
    title:String

    @Prop()
    price:Number
}

export const ProductSchema = SchemaFactory.createForClass(Product);



// export const ProductSchema = new mongoose.Schema({
//     name: String,
//     age: Number,
//     breed: String,
//   });



