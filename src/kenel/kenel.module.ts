import { Module } from '@nestjs/common';
import { KenelController } from './kenel.controller';
import { KenelService } from './kenel.service';
import { DogModule } from 'src/dog/dog.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Kenel, KenelSchema } from './schemas/kenel.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Kenel.name, schema: KenelSchema }]),
    DogModule,
  ],
  controllers: [KenelController],
  providers: [KenelService],
})
export class KenelModule {}
