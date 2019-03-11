import { Module } from '@nestjs/common';
import { AssessmentModule } from './assessment/assessment.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { ApplicationConfiguration } from './application.configuration';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [ConfigurationModule, LoggerModule, AssessmentModule],
  controllers: [],
  providers: [ApplicationConfiguration],
})
export class AppModule {}
