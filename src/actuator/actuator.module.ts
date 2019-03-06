import { Global, Module } from '@nestjs/common';
import { ApplicationMiddlewareHelper } from './helper/application-middleware.helper';

/**
 * This module provides common functionality for web applications
 * Things like application performance, security, health checker, build version
 *
 * @javier.perez
 */
@Global()
@Module({
  providers: [ApplicationMiddlewareHelper],
  exports: [ApplicationMiddlewareHelper],
})
export class ActuatorModule {}
