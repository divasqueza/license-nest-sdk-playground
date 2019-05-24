import {
  TerminusEndpoint,
  TerminusOptionsFactory,
  TerminusModuleOptions,
  HealthIndicatorFunction,
} from '@nestjs/terminus';
import { Injectable } from '@nestjs/common';
import { ServerIndicator } from './server-indicator.service';

@Injectable()
export class TerminusOptionsService implements TerminusOptionsFactory {
  constructor(private readonly server: ServerIndicator) {}

  getHealthUrl(): string {
    return '/health';
  }

  getHealthIndicators(): HealthIndicatorFunction[] {
    return [async () => this.server.check('server')];
  }

  createTerminusOptions(): TerminusModuleOptions {
    const healthEndpoint: TerminusEndpoint = {
      url: this.getHealthUrl(),
      healthIndicators: this.getHealthIndicators(),
    };
    return {
      endpoints: [healthEndpoint],
    };
  }
}
