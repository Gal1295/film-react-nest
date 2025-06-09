import { FilmDto } from '../dto/films.dto';
import { ScheduleItem } from '../dto/schedule-item.dto';

export class FilmMapper {
  static toDto(film: any): FilmDto {
    return {
      id: film._id || film.id,
      title: film.title,
      description: film.description,
      schedule: film.schedule || [],
      image: film.image,
      cover: film.cover,
      rating: film.rating,
      director: film.director,
      tags: film.tags,
      about: film.about,
    };
  }

  static toScheduleDto(schedule: any[]): { items: ScheduleItem[] } {
    if (!schedule || !Array.isArray(schedule)) {
      return { items: [] };
    }

    return {
      items: schedule.map((item) => ({
        id: item.id,
        daytime: item.daytime,
        hall: item.hall,
        rows: item.rows,
        seats: item.seats,
        price: item.price,
        taken: item.taken || [],
      })),
    };
  }
}
