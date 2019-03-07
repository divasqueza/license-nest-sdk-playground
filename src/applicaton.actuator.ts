import { Actuator } from './actuator/actuator.interface';
import { HealthIndicator } from './actuator/model/health-indicator.model';
import { ApplicationConfiguration } from './application.configuration';
import { Injectable } from '@nestjs/common';
import { ApplicationInfo } from './actuator/model/application-info.model';

@Injectable()
export class ApplicationActuator implements Actuator {
  constructor(
    private readonly applicationConfiguration: ApplicationConfiguration,
  ) {}

  check(): HealthIndicator[] {
    // TODO add logic here to verify database connection, SQS or other key app services.
    return this.applicationConfiguration.actuatorEnabled
      ? [
          new HealthIndicator({
            name: 'mysql.assessment',
            up: false,
            reason: 'Connection timeout',
          }),
          new HealthIndicator({
            name: 'content.delivery.service',
            up: false,
            reason: 'Content delivery service is not available',
          }),
        ]
      : [];
  }

  getApplicationInfo(): Partial<ApplicationInfo> {
    const version = '1.0'; // TODO load version from a external source
    return {
      name: 'dp-nestjs-template',
      description: 'ApplicationInfo',
      version,
    };
  }
}
