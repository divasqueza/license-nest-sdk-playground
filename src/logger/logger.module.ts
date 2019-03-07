import { Global, Module } from '@nestjs/common';
import { ApplicationLoggerService } from './services/application-logger.service';
import { NestLoggerService } from './services/nest-logger.service';
import { ConfigurationModule } from '../configuration/configuration.module';
import { LoggerConfiguration } from './configuration/logger.configuration';

/**
 * This module encapsulates the application logging conventions.
 * This is just a sample module to describe the logging approach. In the future a LoggerModule would be provided
 * as a separate library so it can reused by several micro apps.
 */
@Global()
@Module({
  imports: [ConfigurationModule],
  providers: [ApplicationLoggerService, NestLoggerService, LoggerConfiguration],
  exports: [ApplicationLoggerService, NestLoggerService],
})
export class LoggerModule {}
