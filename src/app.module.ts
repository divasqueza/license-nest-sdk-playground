import {
  ContextualLoggerService,
  LoggerService,
} from '@greatminds/dp-logger-lib';
import { ConfigurationModule } from '@greatminds/dp-nestjs-configuration-lib';
import { Logger, LoggerModule } from '@greatminds/dp-nestjs-logger-lib';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { ApplicationConfiguration } from './application.configuration';
import { HealthModule } from './health/health.module';
import { TerminusOptionsService } from './health/services/terminus-options.service';

@Module({
  imports: [
    ConfigurationModule.forRoot(
      ApplicationConfiguration.getConfigurationOptions(),
    ),
    TerminusModule.forRootAsync({
      imports: [HealthModule],
      useExisting: TerminusOptionsService,
    }),
    LoggerModule.forRoot(ApplicationConfiguration.getLoggerOptions()),
  ],
  controllers: [],
  providers: [ApplicationConfiguration, LoggerModule, ConfigurationModule],
})
export class AppModule {
  private readonly log: ContextualLoggerService;
  constructor(@Logger() logger: LoggerService) {
    this.log = logger.getLogger('AppModule');
    this.log.info('Initializing main module');
  }
  configure() {
    this.log.info('Configuring main module');
  }
}
