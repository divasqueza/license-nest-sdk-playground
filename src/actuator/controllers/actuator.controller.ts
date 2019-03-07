import { Controller, Get } from '@nestjs/common';
import { Actuator } from '../actuator.interface';
import * as os from 'os';
import { LocatorHelper } from '../helper/locator.helper';

@Controller('actuator')
export class ActuatorController {
  get actuator(): Actuator {
    return this.locator.actuator;
  }

  constructor(private readonly locator: LocatorHelper) {}

  @Get('health')
  health() {
    const indicators = this.actuator.getHealthIndicators();
    const up = !indicators.filter(indicator => !indicator.up).length;
    return {
      status: up ? 'down' : 'up',
      indicators,
    };
  }

  @Get('info')
  info() {
    return { info: this.actuator.getApplicationInfo() };
  }

  @Get('metrics')
  metrics() {
    return {
      metrics: {
        // TODO define metrics to share
        cpus: os.cpus(),
        uptime: os.uptime(),
        mem: {
          total: os.totalmem(),
          free: os.freemem(),
        },
      },
    };
  }
}
