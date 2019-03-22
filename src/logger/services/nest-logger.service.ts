import { Injectable, LoggerService } from '@nestjs/common';
import { ApplicationLoggerService } from './application-logger.service';

/**
 * This is custom nest logger. It uses the default application logger so that nest log messages are integrated with
 * the logging approach.
 */
@Injectable()
export class NestLoggerService implements LoggerService {
  private readonly NEST_LOGGER_KEY = 'nest';

  constructor(
    private readonly applicationLoggerService: ApplicationLoggerService,
  ) {}

  log(message: string) {
    this.applicationLoggerService.info(this.NEST_LOGGER_KEY, message);
  }

  error(message: string, trace: string) {
    this.applicationLoggerService.error(
      this.NEST_LOGGER_KEY,
      `${message} - ${trace}`,
    );
  }

  warn(message: string) {
    this.applicationLoggerService.warn(this.NEST_LOGGER_KEY, message);
  }
}
