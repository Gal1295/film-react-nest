import { Injectable } from '@nestjs/common';
import { FilmRepository } from '../../repository/film.repository';
import { FilmMapper } from '../mapper/film.mapper';
import { FilmDto } from '../dto/films.dto';
import { ScheduleItem } from '../dto/schedule-item.dto';

@Injectable()
export class FilmsService {
  constructor(private readonly filmRepository: FilmRepository) {}

  async getAll(): Promise<{ items: FilmDto[] }> {
    const { items } = await this.filmRepository.getAll();
    return { items };
  }

  async getAllFilms(): Promise<{ total: number; items: FilmDto[] }> {
    const { items } = await this.filmRepository.getAll();
    return {
      total: items.length,
      items,
    };
  }

  async getSchedule(id: string): Promise<{ items: ScheduleItem[] }> {
    const film = await this.filmRepository.getById(id);

    if (!film || !film.schedule) {
      return { items: [] };
    }

    return FilmMapper.toScheduleDto(film.schedule);
  }
}
