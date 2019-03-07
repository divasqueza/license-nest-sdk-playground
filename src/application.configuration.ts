import { Injectable } from '@nestjs/common';
import { ConfigurationService } from './configuration/services/configuration.service';

/**
 * It encapsulates the application configuration properties.
 * Properties related to the application initialization.
 *
 * @author javier.perez
 */
@Injectable()
export class ApplicationConfiguration {
  constructor(private readonly configuration: ConfigurationService) {}

  get port(): number {
    const port = this.configuration.get('PORT');
    return port ? +port : 3000;
  }

  get actuatorEnabled(): boolean {
    const actuatorEnabled = this.configuration.get('ACTUATOR_ENABLED');
    return !actuatorEnabled || actuatorEnabled === 'true';
  }
}
