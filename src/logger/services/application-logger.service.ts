import { Injectable } from '@nestjs/common';

import { createLogger, format, transports, Logger } from 'winston';

import { LoggerConfiguration } from '../configuration/logger.configuration';

/**
 * Winston logger implementation for application logging.
 *
 * See {LoggerConfiguration} for logger options.
 */
@Injectable()
export class ApplicationLoggerService {
  private readonly logger: Logger;

  constructor(private readonly loggerConfiguration: LoggerConfiguration) {
    this.logger = this.initializeLogger(loggerConfiguration);
  }

  info(key: string, message: string) {
    this.logger.info(this.formatMessage(key, message));
  }

  debug(key: string, message: string) {
    this.logger.debug(this.formatMessage(key, message));
  }

  error(key: string, message: string) {
    this.logger.error(this.formatMessage(key, message));
  }

  warn(key, message: string) {
    this.logger.warn(this.formatMessage(key, message));
  }

  private formatMessage(key: string, message: string) {
    return `${key} - ${message}`;
  }

  private isProduction(): boolean {
    return process.env.NODE_ENV === 'production';
  }

  private initializeLogger(loggerConfiguration: LoggerConfiguration): Logger {
    const production = this.isProduction();

    const loggerTransports = production
      ? [
          new transports.File({
            filename: loggerConfiguration.loggerOutputFile,
          }),
        ] // TODO use a daily rotate logger
      : [new transports.Console()];

    return createLogger({
      level: loggerConfiguration.rootLevel,
      transports: loggerTransports,
      format: format.combine(
        format.timestamp(),
        format.ms(),
        production ? format.json() : format.simple(),
      ),
    });
  }
}
