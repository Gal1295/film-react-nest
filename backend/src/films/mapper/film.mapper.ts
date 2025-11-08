import { FilmDto } from '../dto/films.dto';
import { ScheduleItem } from '../dto/schedule-item.dto';
import { Film } from '../../database/entities/film.entity';

export class FilmMapper {
  static toDto(film: Film): FilmDto {
    return {
      id: film.id,
      title: film.title,
      description: film.description,
      schedule: film.schedules.map(s => ({
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
      image: film.image,
      cover: film.cover,
      rating: film.rating,
      director: film.director,
      tags: film.tags ? [film.tags] : [],
      about: film.about,
    };
  }

  static toScheduleDto(schedule: ScheduleItem[]): { items: ScheduleItem[] } {
    return {
      items: schedule,
    };
  }
}
