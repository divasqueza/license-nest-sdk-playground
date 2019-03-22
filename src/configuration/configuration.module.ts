import { Global, Module } from '@nestjs/common';
import { ConfigurationRepository } from './repository/configuration.repository';
import { ConfigurationService } from './services/configuration.service';

/**
 * This module provides functionality to access application configuration properties.
 * This implementation was created to demonstrate how application properties should be accessed at other modules.
 *
 * An external package will be provided as the official Great Minds configuration module to be reused among several micro apps
 *
 * @javier.perez
 */
@Global()
@Module({
  providers: [ConfigurationRepository, ConfigurationService],
  exports: [ConfigurationService],
})
export class ConfigurationModule {}
