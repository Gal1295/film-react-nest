import { FilmDto } from '../../films/dto/films.dto';

export abstract class FilmRepository {
  abstract getAll(): Promise<{ items: FilmDto[] }>;
  abstract getById(id: string): Promise<FilmDto | null>;
  abstract addTakenToSession(
    filmId: string,
    sessionId: string,
    seat: string,
  ): Promise<void>;
}
