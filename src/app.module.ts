import { Module } from '@nestjs/common';
import { AssessmentModule } from './assessment/assessment.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { ApplicationConfiguration } from './application.configuration';
import { LoggerModule } from './logger/logger.module';
import { ActuatorModule } from './actuator/actuator.module';
import { ApplicationActuator } from './applicaton.actuator';

@Module({
  imports: [
    ConfigurationModule,
    LoggerModule,
    ActuatorModule.forRoot({ actuatorToken: ApplicationActuator }),
    AssessmentModule,
  ],
  controllers: [],
  providers: [ApplicationConfiguration, ApplicationActuator],
})
export class AppModule {}
