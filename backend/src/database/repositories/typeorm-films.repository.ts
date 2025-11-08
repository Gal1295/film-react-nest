import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Film } from '../entities/film.entity';
import { Schedule } from '../entities/schedule.entity';
import { FilmDto } from '../../films/dto/films.dto';
import { FilmRepository } from '../../repository/film.repository';

@Injectable()
export class TypeOrmFilmsRepository extends FilmRepository {
  constructor(@InjectDataSource() private dataSource: DataSource) {
    super();
  }

  async getAll(): Promise<{ items: FilmDto[] }> {
    const films = await this.dataSource.getRepository(Film).find({
      relations: ['schedules'],
    });
    return { items: films.map((f) => this.toDto(f)) };
  }

  async getById(id: string): Promise<FilmDto | null> {
    const film = await this.dataSource.getRepository(Film).findOne({
      where: { id },
      relations: ['schedules'],
    });
    return film ? this.toDto(film) : null;
  }

  async addTakenToSession(filmId: string, sessionId: string, seat: string): Promise<void> {
    const [rowStr, colStr] = seat.split('-');
    const row = Number(rowStr);
    const col = Number(colStr);

    if (isNaN(row) || isNaN(col)) {
      throw new Error('Неверный формат места');
    }

    const schedule = await this.dataSource.getRepository(Schedule).findOne({
      where: { id: sessionId, filmId },
    });

    if (!schedule) {
      throw new Error(`Сеанс ${sessionId} не найден`);
    }

    const takenSeats = schedule.taken ? schedule.taken.split(',').filter(x => x.trim() !== '') : [];
    const seatKey = `${row}:${col}`;
    if (takenSeats.includes(seatKey)) {
      throw new Error('Место уже занято');
    }

    takenSeats.push(seatKey);
    schedule.taken = takenSeats.join(',');
    await this.dataSource.getRepository(Schedule).save(schedule);
  }

  private toDto(film: Film): FilmDto {
    return {
      id: film.id,
      title: film.title,
      description: film.description,
      rating: film.rating,
      director: film.director,
      tags: film.tags ? [film.tags] : [],
      image: film.image,
      cover: film.cover,
      about: film.about,
      schedule: film.schedules.map((s) => ({
        id: s.id,
        daytime: s.daytime,
        hall: s.hall,
        rows: s.rows,
        seats: s.seats,
        price: s.price,
        taken: s.taken
          ? s.taken.split(',').filter(x => x.trim() !== '').map(item => {
              const [r, c] = item.split(':');
              return `${r}-${c}`;
            })
          : [],
      })),
    };
  }
}
