import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateTicketDto {
  @IsNotEmpty()
  @IsString()
  film: string;

  @IsNotEmpty()
  @IsString()
  session: string;

  @IsNotEmpty()
  @IsNumber()
  row: number;

  @IsNotEmpty()
  @IsNumber()
  seat: number;
}

export class CreateOrderDto {
  email: string;
  phone: string;
  tickets: CreateTicketDto[];
}
