import { Response } from 'express';
import { Controller, Get, HttpStatus, Inject, Res } from '@nestjs/common';
import { Actuator } from '../actuator.interface';
import * as os from 'os';
import { TokenProviderLocator } from '../locator/token-provider.locator';

@Controller('actuator')
export class ActuatorController {
  get actuator(): Actuator {
    return this.locator.get();
  }

  constructor(
    @Inject('ActuatorProviderLocator')
    private readonly locator: TokenProviderLocator<Actuator>,
  ) {}

  @Get('health')
  health(@Res() response: Response) {
    const indicators = this.actuator.getHealthIndicators();
    const up = !indicators.filter(indicator => !indicator.up).length;
    response.status(up ? HttpStatus.OK : HttpStatus.SERVICE_UNAVAILABLE).json({
      status: up ? 'down' : 'up',
      indicators,
    });
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
