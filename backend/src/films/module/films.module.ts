import { Module } from '@nestjs/common';
import { FilmsController } from '../controllers/films.controller';
import { FilmsService } from '../services/films.service';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [FilmsController],
  providers: [FilmsService],
})
export class FilmsModule {}
