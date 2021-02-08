import { Module } from '@nestjs/common';
import { TerminusOptionsService } from './services/terminus-options.service';
import { ServerIndicator } from './services/server-indicator.service';
import { HealthOptions } from './options/health.options';
import { DynamicModule } from '@nestjs/common';
import { HeapUsedIndicator } from './services/heap-indicator.service';
import { SystemCPUIndicator } from './services/cpu-indicator.service';
import { EventLoopIndicator } from './services/event-loop-indicator.service';

@Module({})
export class HealthModule {
  static forRoot(options?: HealthOptions): DynamicModule {
    return {
      module: HealthModule,
      providers: [
        ServerIndicator,
        HeapUsedIndicator,
        SystemCPUIndicator,
        EventLoopIndicator,
        {
          provide: TerminusOptionsService,
          useFactory: async (
            serverIndicator: ServerIndicator,
            heapIndicator: HeapUsedIndicator,
            cpuIndicator: SystemCPUIndicator,
            eventLoopIndicator: EventLoopIndicator,
          ): Promise<TerminusOptionsService> => {
            return new TerminusOptionsService(
              serverIndicator,
              heapIndicator,
              cpuIndicator,
              eventLoopIndicator,
              options,
            );
          },
          inject: [
            ServerIndicator,
            HeapUsedIndicator,
            SystemCPUIndicator,
            EventLoopIndicator,
          ],
        },
      ],
      exports: [TerminusOptionsService],
    };
  }
}
