import { ScheduleItem } from './schedule-item.dto';

export class FilmDto {
  readonly id: string;
  readonly rating: number;
  readonly director: string;
  readonly tags: string[];
  readonly about: string;
  readonly image: string;
  readonly cover: string;
  readonly title: string;
  readonly description?: string;
  readonly schedule: ScheduleItem[];
}
