export class ScheduleItem {
  readonly id: string;
  readonly daytime: string;
  readonly hall: number;
  readonly rows: number;
  readonly seats: number;
  readonly price: number;
  readonly taken: string[];
}
