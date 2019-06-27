import { Module } from '@nestjs/common';
import { AssessmentModule } from './assessment/assessment.module';
import { ConfigurationModule } from '@greatminds/dp-nestjs-configuration-lib';
import { LoggerServiceFactory } from '@greatminds/dp-logger-lib';
import { LoggerModule } from '@greatminds/dp-nestjs-logger-lib';
import { ApplicationConfiguration } from './application.configuration';
import { TerminusModule } from '@nestjs/terminus';
import { HealthModule } from './health/health.module';
import { TerminusOptionsService } from './health/services/terminus-options.service';

const prod = process.env.NODE_ENV === 'production';

const loggerService = LoggerServiceFactory.createLoggerService({
  useSimpleFormat: !prod,
});

@Module({
  imports: [
    TerminusModule.forRootAsync({
      imports: [HealthModule],
      useExisting: TerminusOptionsService,
    }),
    ConfigurationModule.forRoot(
      {
        useEnvironmental: !prod,
      },
      loggerService,
    ),
    LoggerModule.forRoot({ useValue: loggerService }),
    AssessmentModule,
  ],
  controllers: [],
  providers: [ApplicationConfiguration],
})
export class AppModule {}
