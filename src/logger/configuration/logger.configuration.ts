import { ConfigurationService } from '../../configuration/services/configuration.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerConfiguration {
  constructor(private readonly configuration: ConfigurationService) {}

  get rootLevel(): string {
    return this.configuration.get('LOGGER_ROOT_LEVEL') || 'info';
  }

  /**
   * Full path to the logger output file. Used by the default file transport
   * @returns {string | string}
   */
  get loggerOutputFile(): string {
    return this.configuration.get('LOGGER_FILE_NAME') || 'application.log';
  }
}
