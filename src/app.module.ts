import { Module } from '@nestjs/common';
import { AssessmentModule } from './assessment/assessment.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { ApplicationConfiguration } from './application.configuration';

/**
 * Prevent comments like this... they dont provide any useful information, it is redundant.
 *
 * Application module.
 */
@Module({
  imports: [ConfigurationModule, AssessmentModule],
  controllers: [],
  providers: [ApplicationConfiguration],
})
export class AppModule {}
