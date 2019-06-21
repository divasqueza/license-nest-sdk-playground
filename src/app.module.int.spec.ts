import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ConfigurationModule } from '@greatminds/dp-nestjs-configuration-lib';
import { TerminusModule } from '@nestjs/terminus';
import { HealthModule } from './health/health.module';
import { TerminusOptionsService } from './health/services/terminus-options.service';

describe('AppModule (integration)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [
        ConfigurationModule.forRoot({ useEnvironmental: true }),
        TerminusModule.forRootAsync({
          imports: [HealthModule],
          useExisting: TerminusOptionsService,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/health', () => {
    it('should return ok', () => {
      return request(app.getHttpServer())
        .get('/health')
        .expect(200)
        .then(response => {
          const data = response.body;
          expect(data.status).toEqual('ok');
          expect(data.info.server.status).toEqual('up');
          expect(data.info.server.version).toBeDefined();
        });
    });
  });
});
