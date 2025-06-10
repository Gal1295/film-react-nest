export class CreateTicketDto {
  film: string;
  session: string;
  row: number;
  seat: number;
}

export class CreateOrderDto {
  email: string;
  phone: string;
  tickets: CreateTicketDto[];
}
