import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApplicationConfiguration } from './application.configuration';
import { NestLoggerService } from '@greatminds/dp-logger-lib';
import { SecurityMiddlewareHelper } from './health/helper/security-middleware.helper';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(app.get(NestLoggerService));

  // TODO define application middleware options as needed
  new SecurityMiddlewareHelper().setupMiddlewares(app, {});

  await app.listen(app.get(ApplicationConfiguration).port);
}
bootstrap();
