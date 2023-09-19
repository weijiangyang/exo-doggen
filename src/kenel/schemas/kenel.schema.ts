/* eslint-disable prettier/prettier */
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Schema } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';



export type KenelDocument = HydratedDocument<Kenel>;
@Schema({ collection: 'kenels', timestamps: true })
export class Kenel {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  capacity: number;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Dog', required: true })
  dogs: [string];
}
export const KenelSchema = SchemaFactory.createForClass(Kenel);
