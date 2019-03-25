import { Module } from '@nestjs/common';
import { AssessmentModule } from './assessment/assessment.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { ApplicationConfiguration } from './application.configuration';
import { LoggerModule } from './logger/logger.module';
import { ActuatorModule } from './actuator/actuator.module';

@Module({
  imports: [
    ConfigurationModule,
    LoggerModule,
    ActuatorModule,
    AssessmentModule,
  ],
  controllers: [],
  providers: [ApplicationConfiguration],
})
export class AppModule {}
