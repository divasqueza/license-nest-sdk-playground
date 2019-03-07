import { DynamicModule, Module, Type } from '@nestjs/common';
import { ApplicationMiddlewareHelper } from './helper/application-middleware.helper';
import { ActuatorController } from './controllers/actuator.controller';
import { FactoryHelper } from './helper/factory.helper';
import { ModuleRef } from '@nestjs/core';

/**
 * This module provides common functionality for web applications
 * Things like application performance, security, health checker, build version
 *
 * @javier.perez
 */

@Module({})
export class ActuatorModule {
  static forRoot(options?: {
    actuatorToken?: Type<any> | string;
  }): DynamicModule {
    return {
      module: ActuatorModule,
      providers: [
        ApplicationMiddlewareHelper,
        {
          provide: 'ActuatorFactoryHelper',
          useFactory: (moduleRef: ModuleRef) => new FactoryHelper(moduleRef, options.actuatorToken),
          inject: [ModuleRef],
        },
      ],
      exports: [ApplicationMiddlewareHelper],
      controllers: [ActuatorController],
    };
  }
}
