import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DevLogger } from './logger/dev.logger';
import { JsonLogger } from './logger/json.logger';
import { TskvLogger } from './logger/tskv.logger';

async function bootstrap() {
  const logFormat = (process.env.LOG_FORMAT || 'dev').toLowerCase();

  let loggerInstance;
  switch (logFormat) {
    case 'json':
      loggerInstance = new JsonLogger();
      break;
    case 'tskv':
      loggerInstance = new TskvLogger();
      break;
    case 'dev':
    default:
      loggerInstance = new DevLogger();
  }

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger: loggerInstance,
  });

  app.setGlobalPrefix('api/afisha');
  app.enableCors({
    origin: true,
    credentials: true,
  });
  await app.listen(3000);
  loggerInstance.log('Nest application successfully started on port 3000');
}
bootstrap();
