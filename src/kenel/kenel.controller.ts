/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { KenelService } from './kenel.service';
import { DogService } from 'src/dog/dog.service';
import { KenelDocument } from './schemas/kenel.schema';
import { Schema } from 'mongoose';

@Controller('kenel')
export class KenelController {
  constructor(
    private readonly kenelService: KenelService,
    private readonly dogService: DogService,
  ) {}

  @Post()
  async create(@Body() body: any): Promise<KenelDocument | {}> {
    try {
      body.dogs.map(async (dogId: string) => {
        const dog = await this.dogService.getById(dogId);
        if (dog) {
          dogId = dog.id;
        }
      });

      return await this.kenelService.create(body);
    } catch (error) {
      console.log('error', error);
      throw new Error('Forbidden');
    }
  }

  @Get()
  async getAll(): Promise<KenelDocument[]> {
    return this.kenelService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<KenelDocument> {
    try {
      return await this.kenelService.getById(id);
    } catch (error) {
      console.log('error', error);
      throw new Error('Forbidden');
    }
  }
  @Get('kenels/atLeastOneDog')
  async getKenelsWithAtLeastOneDog() {
    try {
      return this.kenelService.getWithAtLeastOneDog();
    } catch (error) {
      console.log('error', error);
      throw new Error('Forbidden');
    }
  }
  @Get('kenels/:id/:race')
  async getRacesInAkenel(@Param('id') id: string, @Param('race') race: string) {
    const kenel = await this.kenelService.getById(id);
    const dogIds = kenel.dogs;
    const dogs = await Promise.all(
      dogIds.map(async (dogId) => {
        return await this.dogService.getById(dogId);
      }),
    );

    return dogs.filter((dog) => {
      return dog.race === race;
    });
  }

  @Get('kenels/:id/noadopted')
  async getDogsNoAdoptedInAKenel(@Param('id') id: string) {
    const kenel = await this.kenelService.getById(id);
    const dogIds = kenel.dogs;
    const dogs = await Promise.all(
      dogIds.map(async (dogId) => {
        return await this.dogService.getById(dogId);
      }),
    );
    return dogs.filter((dog) => {
      return dog.isAdopted === false;
    });
  }

  @Get('kenels/:id/adoptedpourcent')
  async getAdoptedPourcent(@Param('id') id:string) {
    const kenel = await this.kenelService.getById(id);
    
}
    
  @Put(':id')
  async update(
    @Body() body: any,
    @Param('id') id: string,
  ): Promise<KenelDocument | {}> {
    try {
      const kenel = this.kenelService.getById(id);
      if (!kenel) {
        return { error: true, message: 'error', status: 404 };
      }
      body.dogs.map(async (dogId: string) => {
        const dog = await this.dogService.getById(dogId);
        if (dog) {
          dogId = dog.id;
        }
      });
      return await this.kenelService.update(body, id);
    } catch (error) {
      console.log('error', error);
      throw new Error('Forbidden');
    }
  }

  @Put('/:id/adddog')
  async addDog(@Param('id') id: string, @Body('dog') dogId: any) {
    try {
      const kenel = await this.getById(id);
      if (!kenel) return { error: true, message: "this kenel isn't found" };
      const dog = await this.dogService.getById(dogId);
      if (!dog) return { error: true, message: "this dog isn't found" };
      dogId = dog.id;
      kenel.dogs.push(dogId);
      return kenel;
    } catch (error) {
      console.log('error', error);
      throw new Error('Forbidden');
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void | {}> {
    try {
      const kenel = await this.kenelService.getById(id);
      if (!kenel) return { message: "this kenel isn't found" };
      this.kenelService.delete(id);
    } catch (error) {
      console.log('error', error);
      throw new Error('Forbidden');
    }
  }
}
