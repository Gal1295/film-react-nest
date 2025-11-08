import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FilmsModule } from './films/module/films.module';
import { OrderModule } from './order/module/order.module';
import { DatabaseModule } from './database/database.module';

@Module({})
export class AppModule {
  static forRoot() {
    return {
      module: AppModule,
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        ServeStaticModule.forRoot({
          rootPath: join(__dirname, '..', 'public', 'afisha'),
          serveRoot: '/content/afisha',
        }),
        DatabaseModule,
        FilmsModule,
        OrderModule,
      ],
      providers: [],
    };
  }
}
