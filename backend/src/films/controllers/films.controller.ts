import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from '../services/films.service';
import { ScheduleItem } from '../dto/schedule-item.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async getAll() {
    return this.filmsService.getAll();
  }

  @Get(':id/schedule')
  async getSchedule(
    @Param('id') id: string,
  ): Promise<{ items: ScheduleItem[] }> {
    return this.filmsService.getSchedule(id);
  }
}
