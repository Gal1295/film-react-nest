import { ScheduleItem } from './schedule-item.dto';

export class FilmDto {
  id!: string;
  title!: string;
  description!: string;
  rating!: number;
  director!: string;
  tags!: string[];
  image!: string;
  cover!: string;
  about!: string;
  schedule!: ScheduleItem[];
}
