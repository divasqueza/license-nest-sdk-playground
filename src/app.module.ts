import { Module } from '@nestjs/common';
import { dpEnvironment } from '@greatminds/dp-configuration-lib';
import { LoggerServiceFactory } from '@greatminds/dp-logger-lib';
import { LoggerModule } from '@greatminds/dp-nestjs-logger-lib';
import { ConfigurationModule } from '@greatminds/dp-nestjs-configuration-lib';
import { AppConfiguration } from './configuration/app.configuration';
import { HealthModule } from './health';

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
    HealthModule,
  ],
  controllers: [],
  providers: [AppConfiguration],
})
export class AppModule {}
