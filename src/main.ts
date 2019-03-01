import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApplicationConfiguration } from './application.configuration';
import { NestLoggerService } from './logger/services/nest-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(NestLoggerService));
  await app.listen(app.get(ApplicationConfiguration).port());
}
bootstrap();
