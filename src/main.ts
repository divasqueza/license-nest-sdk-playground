import { LoggerService, LoggerServiceFactory } from '@greatminds/dp-logger-lib';
import { NestLoggerService } from '@greatminds/dp-nestjs-logger-lib';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv-safe';
import { AppModule } from './app.module';
import { ApplicationConfiguration } from './application.configuration';
import { SecurityMiddlewareHelper } from './health/helper/security-middleware.helper';

async function bootstrap() {
  dotenv.config({ allowEmptyValues: false });

  const logger = await createRootLogger();
  const log = logger.getLogger('Bootstrap');
  log.info('Starting application', {
    dpEnvironment: process.env.DP_ENV,
    nodeEnvironment: process.env.NODE_ENV,
  });

  const nestLogger = new NestLoggerService(logger);

  const app = await NestFactory.create(AppModule, { logger: nestLogger });

  new SecurityMiddlewareHelper().setupMiddlewares(app, {});

  await app.listen(app.get(ApplicationConfiguration).port);
}

async function createRootLogger(): Promise<LoggerService> {
  const config = ApplicationConfiguration.getLoggerOptions();
  const loggerFactory = LoggerServiceFactory.createLoggerService(
    config.loggerOptions,
  );
  return loggerFactory;
}

bootstrap();
