import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FilmRepository } from '../../repository/film.repository';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderDto } from '../dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly filmRepository: FilmRepository) {}

  async createOrder(dto: CreateOrderDto): Promise<{ items: OrderDto[] }> {
    if (!dto.tickets || dto.tickets.length === 0) {
      throw new HttpException(
        'Нет билетов для бронирования',
        HttpStatus.BAD_REQUEST,
      );
    }

    const results = [];

    for (const ticket of dto.tickets) {
      const film = await this.filmRepository.getById(ticket.film);
      if (!film) {
        throw new HttpException(
          `Фильм ${ticket.film} не найден`,
          HttpStatus.NOT_FOUND,
        );
      }

      const takenSeat = `${ticket.row}:${ticket.seat}`;
      const session = film.schedule.find((s) => s.id === ticket.session);

      if (!session) {
        throw new HttpException(
          `Сеанс ${ticket.session} не найден`,
          HttpStatus.NOT_FOUND,
        );
      }

      if (session.taken.includes(takenSeat)) {
        throw new HttpException(
          `Место ${takenSeat} уже занято`,
          HttpStatus.CONFLICT,
        );
      }

      await this.filmRepository.addTakenToSession(
        film.id,
        ticket.session,
        takenSeat,
      );

      results.push({
        id: film.id,
        filmId: ticket.film,
        sessionId: ticket.session,
        row: ticket.row,
        seat: ticket.seat,
        timestamp: new Date(),
      });
    }

    return { items: results };
  }
}
