import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film, FilmDocument } from '../films/entities/film.schema';
import { FilmDto } from '../films/dto/films.dto';
import { FilmMapper } from '../films/mapper/film.mapper';

@Injectable()
export class FilmRepository {
  constructor(@InjectModel(Film.name) private filmModel: Model<FilmDocument>) {}

  async getAll(): Promise<{ items: FilmDto[] }> {
    const films = await this.filmModel.find().exec();
    return {
      items: films.map(FilmMapper.toDto),
    };
  }

  async getById(id: string): Promise<FilmDto | null> {
    const film = await this.filmModel.findById(id).exec();
    if (!film) return null;
    return FilmMapper.toDto(film);
  }

  async addTakenToSession(filmId: string, sessionId: string, seat: string) {
    const film = await this.filmModel.findById(filmId);
    if (!film) throw new Error(`Фильм ${filmId} не найден`);

    const session = film.schedule.find((s) => s.id === sessionId);
    if (!session) throw new Error(`Сеанс ${sessionId} не найден`);

    session.taken.push(seat);
    await film.save();

    return film;
  }
}
