import { Module } from '@nestjs/common';
import { DogService } from './dog.service';
import { DogController } from './dog.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Dog, DogSchema } from './schemas/dog.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Dog.name, schema: DogSchema }])],
  providers: [DogService],
  controllers: [DogController],
  // eslint-disable-next-line prettier/prettier
  exports:[DogService]
})
export class DogModule {}
