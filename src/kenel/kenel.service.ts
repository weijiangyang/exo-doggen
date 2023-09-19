/* eslint-disable prettier/prettier */

import { InjectModel } from '@nestjs/mongoose';
import { Kenel, KenelDocument } from './schemas/kenel.schema';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class KenelService {
  constructor(
    @InjectModel(Kenel.name)
    private kenelModel: Model<KenelDocument>,
  ) {}

  async create(body: any): Promise<KenelDocument> {
    return await this.kenelModel.create(body);
  }

  async getAll(): Promise<KenelDocument[]> {
    return await this.kenelModel.find({});
  }

  async getById(id: string): Promise<KenelDocument> {
    return await this.kenelModel.findById(id);
  }

  async update(body: any, id: string): Promise<KenelDocument> {
    return await this.kenelModel.findByIdAndUpdate({ _id: id }, body, {
      new: true,
    });
  }

  async delete(id: string): Promise<void> {
    const kenel = await this.kenelModel.findByIdAndDelete(id);
    console.log(
      '🚀 ~ file: kenel.service.ts:33 ~ KenelService ~ delete ~ kenel:',
      kenel,
    );
  }

  async getWithAtLeastOneDog() {
    const kenels = await this.kenelModel.find({});

    kenels.filter((kenel) => {
      kenel.dogs.length > 0;
    });
    return kenels.map((kenel) => kenel.name);
  }
}
