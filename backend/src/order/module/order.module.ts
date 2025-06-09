import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Film, FilmSchema } from '../../films/entities/film.schema';
import { OrderController } from '../controllers/order.controller';
import { OrderService } from '../services/order.service';
import { FilmRepository } from '../../repository/film.repository';
import { FilmsModule } from 'src/films/module/films.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
    FilmsModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, FilmRepository],
})
export class OrderModule {}
