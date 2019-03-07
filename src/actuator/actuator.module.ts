import { DynamicModule, Module, Type } from '@nestjs/common';
import { ApplicationMiddlewareHelper } from './helper/application-middleware.helper';
import { ActuatorController } from './controllers/actuator.controller';

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
        { provide: 'ActuatorToken', useValue: options.actuatorToken },
      ],
      exports: [ApplicationMiddlewareHelper],
      controllers: [ActuatorController],
    };
  }
}
