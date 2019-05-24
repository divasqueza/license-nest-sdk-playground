import { Module } from '@nestjs/common';
import { AssessmentModule } from './assessment/assessment.module';
import { ConfigurationModule } from '@greatminds/dp-configuration-lib';
import { LoggerModule } from '@greatminds/dp-logger-lib';
import { ApplicationConfiguration } from './application.configuration';
import { TerminusModule } from '@nestjs/terminus';
import { HealthModule } from './health/health.module';
import { TerminusOptionsService } from './health/services/terminus-options.service';

const prod = process.env.NODE_ENV === 'production';

@Module({
  imports: [
    TerminusModule.forRootAsync({
      imports: [HealthModule],
      useExisting: TerminusOptionsService,
    }),
    ConfigurationModule.forRoot({
      useEnvironmental: !prod,
    }),
    LoggerModule.forRoot({
      useSimpleFormat: !prod,
    }),
    AssessmentModule,
  ],
  controllers: [],
  providers: [ApplicationConfiguration],
})
export class AppModule {}
