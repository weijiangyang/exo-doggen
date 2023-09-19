import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DogModule } from './dog/dog.module';
import { MongooseModule } from '@nestjs/mongoose';
import { KenelModule } from './kenel/kenel.module';

@Module({
  imports: [
    DogModule,
    MongooseModule.forRoot(
      'mongodb+srv://weijiangyanglaval:Ywj32559438@cluster0.zsms32d.mongodb.net/exo-doggen',
    ),
    KenelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
