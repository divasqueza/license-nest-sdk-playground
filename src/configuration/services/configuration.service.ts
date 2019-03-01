import { Injectable } from '@nestjs/common';
import { ConfigurationRepository } from '../repository/configuration.repository';

/**
 * This service is an abstraction layer to retrieve configuration properties.
 * It loads properties from a default nconf repository.
 *
 *
 * @author javier.perez
 */
@Injectable()
export class ConfigurationService {
  constructor(
    private readonly configurationRepository: ConfigurationRepository,
  ) {}

  get(key: string): string {
    return this.configurationRepository.get(key);
  }
}
