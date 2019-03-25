import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApplicationConfiguration } from './application.configuration';
import { NestLoggerService } from './logger/services/nest-logger.service';
import { ApplicationMiddlewareHelper } from './actuator/helper/application-middleware.helper';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(app.get(NestLoggerService));

  // TODO define application middleware options as needed
  app.get(ApplicationMiddlewareHelper).setupMiddlewares(app, {});

  await app.listen(app.get(ApplicationConfiguration).port);
}
bootstrap();
