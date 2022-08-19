import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()

export class Product {
    @Prop()
    id: Number;

    @Prop() 
    title:String

    @Prop()
    price:Number
}
