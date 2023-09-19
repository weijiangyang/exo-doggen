/* eslint-disable prettier/prettier */
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { DogBreeds } from 'src/enum';

export type DogDocument = HydratedDocument<Dog>;
@Schema({ collection: 'dogs', timestamps: true })
export class Dog {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    enum: DogBreeds,
    required: true,
  })
    race: string;
    
    @Prop({
        required:true
    })
    isAdopted:boolean
}
export const DogSchema = SchemaFactory.createForClass(Dog);