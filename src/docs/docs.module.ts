import { Module } from '@nestjs/common';
import { ConfigurationModule } from '@greatminds/dp-nestjs-configuration-lib';
import { LoggerModule } from '@greatminds/dp-nestjs-logger-lib';

@Module({
  imports: [
    ConfigurationModule.forRoot({
      useEnvironmental: true,
    }),
    LoggerModule.forRoot(),
  ],
})
export class DocsModule {}
