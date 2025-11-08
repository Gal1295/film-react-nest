import { Injectable } from '@nestjs/common';
import { FilmRepository } from '../../repository/film.repository';
import { FilmMapper } from '../mapper/film.mapper';

@Injectable()
export class FilmsService {
  constructor(private readonly filmRepository: FilmRepository) {}

  async getAll() {
    return this.filmRepository.getAll();
  }

  async getAllFilms() {
    const { items } = await this.filmRepository.getAll();
    return { total: items.length, items };
  }

  async getSchedule(id: string) {
    const film = await this.filmRepository.getById(id);
    if (!film || !film.schedule) return { items: [] };
    return FilmMapper.toScheduleDto(film.schedule);
  }
}
