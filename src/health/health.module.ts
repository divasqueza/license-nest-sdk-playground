import { Module } from '@nestjs/common';
import { TerminusOptionsService } from './services/terminus-options.service';
import { ServerIndicator } from './services/server-indicator.service';

@Module({
  imports: [],
  providers: [TerminusOptionsService, ServerIndicator],
  exports: [TerminusOptionsService],
})
export class HealthModule {}
