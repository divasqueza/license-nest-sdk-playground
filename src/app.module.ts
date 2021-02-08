import { Module } from '@nestjs/common';
import { dpEnvironment } from '@greatminds/dp-configuration-lib';
import { LoggerServiceFactory } from '@greatminds/dp-logger-lib';
import { LoggerModule } from '@greatminds/dp-nestjs-logger-lib';
import { ConfigurationModule } from '@greatminds/dp-nestjs-configuration-lib';
import { TerminusModule } from '@nestjs/terminus';
import { AppConfiguration } from './configuration/app.configuration';
import { API_PREFIX } from './constants/api.constants';
import { HealthModule, TerminusOptionsService } from './health';

const isProduction = process.env.NODE_ENV === 'production';
const loggerService = LoggerServiceFactory.createLoggerService({
  useSimpleFormat: !isProduction,
});

@Module({
  imports: [
    ConfigurationModule.forRoot(
      {
        secretsManagerSecretIds: isProduction
          ? [
              {
                id: `${dpEnvironment()}-dp-template`, // replace this with your application secret manager key
                path: `template`, // this is the key for the loaded information
              },
            ]
          : undefined,
        useEnvironmental: !isProduction,
      },
      loggerService,
    ),
    LoggerModule.forRoot({ useValue: loggerService }),
    TerminusModule.forRootAsync({
      imports: [
        HealthModule.forRoot({
          readinessCheckUrl: `${API_PREFIX}/health/readiness`,
          livenessCheckUrl: `${API_PREFIX}/health/liveness`,
        }),
      ],
      useExisting: TerminusOptionsService,
    }),
  ],
  controllers: [],
  providers: [AppConfiguration],
})
export class AppModule {}
