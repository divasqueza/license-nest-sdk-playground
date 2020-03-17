import { Module } from '@nestjs/common';
import { TerminusOptionsService } from './services/terminus-options.service';
import { ServerIndicator } from './services/server-indicator.service';
import { HealthOptions } from './options/health.options';
import { DynamicModule } from '@nestjs/common';

@Module({})
export class HealthModule {
  static forRoot(options?: HealthOptions): DynamicModule {
    return {
      module: HealthModule,
      providers: [
        ServerIndicator,
        {
          provide: TerminusOptionsService,
          useFactory: async (
            serverIndicator: ServerIndicator,
          ): Promise<TerminusOptionsService> => {
            return new TerminusOptionsService(serverIndicator, options);
          },
          inject: [ServerIndicator],
        },
      ],
      exports: [TerminusOptionsService],
    };
  }
}
