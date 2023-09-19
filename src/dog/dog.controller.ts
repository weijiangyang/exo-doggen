/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Param, Get, Put } from '@nestjs/common';
import { DogService } from './dog.service';
import { DogDocument } from './schemas/dog.schema';

@Controller('dog')
export class DogController {
  constructor(private readonly dogService: DogService) {}

  @Post()
  async create(
    @Body() body: any,
    // eslint-disable-next-line @typescript-eslint/ban-types
  ): Promise<DogDocument | {}> {
    try {
      return this.dogService.create(body);
    } catch (error) {
      console.log(error, 'error');
      throw new Error('Forbidden');
    }
  }

  @Get(':id')
  // eslint-disable-next-line @typescript-eslint/ban-types
  async getById(@Param('id') id: string): Promise<{}> {
    try {
      const dog = await this.dogService.getById(id);
      if (!dog) {
        return { error: true, message: 'error', status: 404 };
      }
      return { data: dog, message: 'dog is found', status: 200 };
    } catch (error) {
      console.log(error, 'error');
      throw new Error('Forbidden');
    }
  }

  @Get()
  async getAll(): Promise<DogDocument[]> {
    try {
      const dogs = await this.dogService.getAll();

      return dogs;
    } catch (error) {
      console.log(error, 'error');
      throw new Error('Forbidden');
    }
  }
  @Put(':id')
  async update(
    @Body() body: any,
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Param('id') id: string,
  ): Promise<DogDocument | {}> {
    try {
      const dog = this.dogService.getById(id);
      if (!dog) {
        return { error: true, message: 'error', status: 404 };
      }
      return await this.dogService.update(body, id);
    } catch (error) {
      console.log(error, 'error');
      throw new Error('Forbidden');
    }
  }

  @Put(':id/adopte')
  // eslint-disable-next-line @typescript-eslint/ban-types
  async adoptADog(@Param('id') id: string): Promise<DogDocument | {}> {
    try {
      const dog = await this.dogService.getById(id);
      if (!dog) {
        return { error: true, message: "this dog isn'n found" };
      }
      return { ...dog, isAdopted: true };
    } catch (error) {
      console.log(error, 'error');
      throw new Error('Forbidden');
    }
  }
}
