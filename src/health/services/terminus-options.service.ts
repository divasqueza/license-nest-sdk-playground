import {
  TerminusEndpoint,
  TerminusOptionsFactory,
  TerminusModuleOptions,
  HealthIndicatorFunction,
} from '@nestjs/terminus';
import { Injectable } from '@nestjs/common';
import { ServerIndicator } from './server-indicator.service';
import { HealthOptions } from '../options/health.options';

@Injectable()
export class TerminusOptionsService implements TerminusOptionsFactory {
  constructor(
    private readonly server: ServerIndicator,
    private readonly options: HealthOptions,
  ) {}

  getHealthUrl(): string {
    return this.options.healthCheckUrl || '/health';
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
