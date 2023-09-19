/* eslint-disable prettier/prettier */
import {  Injectable } from '@nestjs/common';
import { Dog, DogDocument } from './schemas/dog.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class DogService {
  constructor(
    @InjectModel(Dog.name)
    private dogModel: Model<DogDocument>,
  ) {}
  async create(body: any): Promise<DogDocument> {
    return await this.dogModel.create(body);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async getById(id: string): Promise<DogDocument> {
    return await this.dogModel.findById(id);
  }

  async getAll(): Promise<DogDocument[]> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const dogs = await this.dogModel.find({});
      return dogs
  }
    
    async update(body:any,id:string):Promise<DogDocument> {
        const dog = await this.dogModel.findByIdAndUpdate({ _id : id }, body, { new: true })
        return dog;
 }
}
