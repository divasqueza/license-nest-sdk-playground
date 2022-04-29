import { DynamicModule, Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { LicenseSdkModule } from '@greatminds/dp-license-nestjs-sdk';

@Module({
  imports: [
    LicenseSdkModule.forRoot({
      hostURL: 'https://digital.dev.greatminds.dev',
    }) as DynamicModule
  ],
  controllers: [
    TestController,
  ],
})
export class TestModule {}
