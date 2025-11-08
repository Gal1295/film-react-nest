import { FilmDto } from '../films/dto/films.dto';

export class FilmRepository {
  getAll(): Promise<{ items: FilmDto[] }> {
    throw new Error('Метод должен быть реализован в подклассе');
  }

  getById(_id: string): Promise<FilmDto | null> {
    throw new Error('Метод должен быть реализован в подклассе');
  }

    
  addTakenToSession(
    _filmId: string,
    _sessionId: string,
    _seat: string,
  ): Promise<void> {
    void _filmId;
    void _sessionId;
    void _seat;
    throw new Error('Метод должен быть реализован в подклассе');
  }
}
