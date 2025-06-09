import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Film, FilmSchema } from '../entities/film.schema';
import { FilmsController } from '../controllers/films.controller';
import { FilmsService } from '../services/films.service';
import { FilmRepository } from '../../repository/film.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
  ],
  controllers: [FilmsController],
  providers: [FilmsService, FilmRepository],
  exports: [FilmsService, FilmRepository, MongooseModule],
})
export class FilmsModule {}
