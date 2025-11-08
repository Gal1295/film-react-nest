import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Film } from './entities/film.entity';
import { Schedule } from './entities/schedule.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async (configService: ConfigService) => {
      const dataSourceOptions: DataSourceOptions = {
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST', 'localhost'),
        port: configService.get<number>('POSTGRES_PORT', 5432),
        username: configService.get<string>('POSTGRES_USER', 'prac'),
        password: configService.get<string>('POSTGRES_PASSWORD', 'prac'),
        database: configService.get<string>('POSTGRES_DB', 'prac'),
        entities: [Film, Schedule],
        synchronize: configService.get<string>('NODE_ENV') === 'development',
        logging: false,
      };

      const dataSource = new DataSource(dataSourceOptions);
      await dataSource.initialize();
      console.log('✅ Подключено к PostgreSQL');
      return dataSource;
    },
    inject: [ConfigService],
  },
  {
    provide: DataSource,
    useFactory: (dataSource: DataSource) => dataSource,
    inject: ['DATA_SOURCE'],
  },
];
