import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestLoggerService } from '@greatminds/dp-nestjs-logger-lib';
import { AppConfiguration } from './configuration/app.configuration';
import { LoggerService, LoggerServiceFactory } from '@greatminds/dp-logger-lib';
import { LoggerConfiguration } from './configuration/logger.configuration';
import { dpEnvironment } from '@greatminds/dp-configuration-lib';
import { API_PREFIX } from './constants/api.constants';

async function createRootLogger(isProduction: boolean): Promise<LoggerService> {
  const config = LoggerConfiguration.getLoggerOptions(isProduction);
  return LoggerServiceFactory.createLoggerService(config.loggerOptions);
}

async function bootstrap() {
  const nodeEnvironment = process.env.NODE_ENV;

  const logger = await createRootLogger(nodeEnvironment === 'production');
  const log = logger.getLogger('Bootstrap');
  log.info('Starting application', {
    dpEnvironment: dpEnvironment(),
    nodeEnvironment,
  });

  const nestLogger = new NestLoggerService(logger);

  const app = await NestFactory.create(AppModule, { logger: nestLogger });

  app.setGlobalPrefix(API_PREFIX);
  // app.useGlobalFilters(new ExceptionFilter(logger));
  // app.useGlobalInterceptors(new ApiResponseInterceptor());
  // SecurityMiddlewareHelper.setupMiddlewares(app, {});
  await app.listen(app.get(AppConfiguration).port);
}
bootstrap();
