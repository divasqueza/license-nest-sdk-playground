import { Module } from '@nestjs/common';
import { AssessmentModule } from './assessment/assessment.module';
import { ConfigurationModule } from '@greatminds/dp-configuration-lib';
import { LoggerModule } from '@greatminds/dp-logger-lib';
import { ApplicationConfiguration } from './application.configuration';
import { ActuatorModule } from './actuator/actuator.module';
import { ApplicationActuator } from './applicaton.actuator';

@Module({
  imports: [
    ConfigurationModule.forRoot({ useEnvironmental: true }),
    LoggerModule.forRoot({
      useSimpleFormat: process.env.NODE_ENV !== 'production',
    }),
    ActuatorModule.forRoot({ actuatorToken: ApplicationActuator }),
    AssessmentModule,
  ],
  controllers: [],
  providers: [ApplicationConfiguration, ApplicationActuator],
})
export class AppModule {}
