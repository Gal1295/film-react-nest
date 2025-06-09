import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FilmsModule } from './films/module/films.module';
import { OrderModule } from './order/module/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: `mongodb://localhost:27017/afisha`,
      }),
      inject: [],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public', 'afisha'),
      serveRoot: '/content/afisha',
    }),
    FilmsModule,
    OrderModule,
  ],
  providers: [],
})
export class AppModule {}
