import { Controller, Get, Inject, OnModuleInit, Type } from '@nestjs/common';
import { Actuator } from '../actuator.interface';
import { ModuleRef } from '@nestjs/core';
import * as os from 'os';

@Controller('actuator')
export class ActuatorController implements OnModuleInit {
  private actuator: Actuator;

  constructor(
    private readonly moduleRef: ModuleRef,
    @Inject('ActuatorToken')
    private readonly actuatorToken: Type<any> | string | symbol,
  ) {}

  onModuleInit() {
    this.actuator = this.moduleRef.get(this.actuatorToken, { strict: false });
  }

  @Get('health')
  health() {
    const indicators = this.actuator.check();
    return {
      status: indicators.length ? 'down' : 'up',
      indicators,
    };
  }

  @Get('info')
  info() {
    return this.actuator.getApplicationInfo();
  }

  @Get('metrics')
  metrics() {
    return {
      // TODO define metrics to share
      cpus: os.cpus(),
      uptime: os.uptime(),
      mem: {
        total: os.totalmem(),
        free: os.freemem(),
      },
    };
  }
}
