//TODO реализовать DTO для /orders
export class OrderDto {
  readonly id: string;
  readonly filmId: string;
  readonly sessionId: string;
  readonly row: number;
  readonly seat: number;
  readonly timestamp: Date;
}
