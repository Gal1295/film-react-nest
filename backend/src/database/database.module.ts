import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { databaseProviders } from './database.providers';
import { TypeOrmFilmsRepository } from './repositories/typeorm-films.repository';
import { FilmRepository } from '../repository/film.repository';

@Module({
  imports: [ConfigModule],
  providers: [
    ...databaseProviders,
    TypeOrmFilmsRepository,
    {
      provide: FilmRepository,
      useExisting: TypeOrmFilmsRepository,
    },
  ],
  exports: [...databaseProviders, FilmRepository],
})
export class DatabaseModule {}
