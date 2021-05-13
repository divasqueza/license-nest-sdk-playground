import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { SystemCPUIndicator } from '../services/cpu-indicator.service';
import { EventLoopIndicator } from '../services/event-loop-indicator.service';
import { HeapUsedIndicator } from '../services/heap-indicator.service';
import { ServerIndicator } from '../services/server-indicator.service';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private server: ServerIndicator,
    private cpu: SystemCPUIndicator,
    private eventLoop: EventLoopIndicator,
    private heap: HeapUsedIndicator,
  ) {}

  @Get('/readiness')
  @HealthCheck()
  healthCheck() {
    return this.health.check([async () => this.server.check('server')]);
  }

  @Get('/liveness')
  @HealthCheck()
  livenessCheck() {
    return this.health.check([
      async () => this.eventLoop.check('eventLoop'),
      async () => this.cpu.check('cpu'),
      async () => this.heap.check('memory'),
    ]);
  }
}
