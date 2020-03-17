import { Test } from '@nestjs/testing';
import { HealthModule } from './health.module';
import { TerminusOptionsService } from './services/terminus-options.service';

describe('HealthModule', () => {
  describe('forRoot', () => {
    it('instantiate health service without crashing', async () => {
      const module = await Test.createTestingModule({
        imports: [HealthModule.forRoot({ healthCheckUrl: 'any-url' })],
      }).compile();

      expect(module.get(TerminusOptionsService)).toBeDefined();
    });
  });
});
