import {
  TerminusEndpoint,
  TerminusOptionsFactory,
  TerminusModuleOptions,
  HealthIndicatorFunction,
} from '@nestjs/terminus';
import { Injectable } from '@nestjs/common';
import { ServerIndicator } from './server-indicator.service';
import { HealthOptions } from '../options/health.options';
import { HeapUsedIndicator } from './heap-indicator.service';
import { SystemCPUIndicator } from './cpu-indicator.service';
import { EventLoopIndicator } from './event-loop-indicator.service';

@Injectable()
export class TerminusOptionsService implements TerminusOptionsFactory {
  constructor(
    private readonly server: ServerIndicator,
    private readonly heap: HeapUsedIndicator,
    private readonly cpu: SystemCPUIndicator,
    private readonly eventLoop: EventLoopIndicator,
    private readonly options: HealthOptions,
  ) {}

  getReadinessUrl(): string {
    return this.options.readinessCheckUrl || '/health/readiness';
  }
  getLivenessUrl(): string {
    return this.options.livenessCheckUrl || '/health/liveness';
  }

  getReadinessIndicators(): HealthIndicatorFunction[] {
    return [async () => this.server.check('server')];
  }

  getLivenessIndicators(): HealthIndicatorFunction[] {
    return [
      async () => this.eventLoop.check('eventLoop'),
      async () => this.cpu.check('cpu'),
      async () => this.heap.check('memory'),
    ];
  }

  createTerminusOptions(): TerminusModuleOptions {
    const readinessEndpoint: TerminusEndpoint = {
      url: this.getReadinessUrl(),
      healthIndicators: this.getReadinessIndicators(),
    };
    const livenessEndpoint: TerminusEndpoint = {
      url: this.getLivenessUrl(),
      healthIndicators: this.getLivenessIndicators(),
    };
    return {
      endpoints: [livenessEndpoint, readinessEndpoint],
    };
  }
}
