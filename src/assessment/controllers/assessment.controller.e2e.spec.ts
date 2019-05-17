import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AssessmentService } from '../services/assessment.service';
import { mock } from '@greatminds/dp-testing-lib';
import { Assessment } from '../models/assessment.model';
import { InternalAssessmentGuard } from '../guards/internal-assessment.guard';
import { ConfigurationModule } from '@greatminds/dp-configuration-lib';
import { AssessmentModule } from '../assessment.module';
import Mock = jest.Mock;
import { InvalidAssessmentStatusException } from '../exceptions/invalid-assessment-status.exception';

describe('AssessmentController - e2e', () => {
  let app: INestApplication;
  const assessmentMock: Assessment = new Assessment({
    id: 1,
    name: 'any-name',
    status: 'active',
    idleTimeout: 10,
    score: 100,
  });

  const assessmentServiceMock = mock<AssessmentService>({
    create: jest.fn(),
    findAll: jest.fn(),
  });

  const internalAssessmentGuardMock = mock<InternalAssessmentGuard>({
    canActivate: jest.fn(),
  });

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigurationModule.forRoot({ useEnvironmental: true }),
        AssessmentModule,
      ],
    })
      .overrideProvider(AssessmentService)
      .useValue(assessmentServiceMock)
      .overrideGuard(InternalAssessmentGuard)
      .useValue(internalAssessmentGuardMock)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it(`/GET findAll when authorized`, async () => {
    (assessmentServiceMock.findAll as Mock).mockResolvedValue([assessmentMock]);
    (internalAssessmentGuardMock.canActivate as Mock).mockReturnValue(true);

    await request(app.getHttpServer())
      .get('/assessments')
      .set('Accept', 'application/json')
      .expect(200)
      .then(response => {
        const data = response.body;
        expect(data.length).toBe(1);

        const assessment = data[0];
        expect(assessment.id).toBe(1);
        expect(assessment.name).toBe('any-name');
        expect(assessment.status).toBe('active');
        expect(assessment.idleTimeout).toBe(10);
        expect(assessment.score).toBe(100);
      });
  });

  it(`/GET findAll when not authorized`, async () => {
    (internalAssessmentGuardMock.canActivate as Mock).mockReturnValue(false);

    await request(app.getHttpServer())
      .get('/assessments')
      .set('Accept', 'application/json')
      .expect(403)
      .then(response => {
        const data = response.body;
        expect(data.error).toBe('Forbidden');
        expect(data.message).toBe('Forbidden resource');
      });
  });

  it(`/GET findAll when throwing InvalidAssessmentStatusException`, async () => {
    (assessmentServiceMock.findAll as Mock).mockImplementation(() => {
      throw new InvalidAssessmentStatusException('Assessment is clsoed');
    });
    (internalAssessmentGuardMock.canActivate as Mock).mockReturnValue(true);

    await request(app.getHttpServer())
      .get('/assessments')
      .set('Accept', 'application/json')
      .expect(400)
      .then(response => {
        const data = response.body;
        expect(data.statusCode).toBeDefined();
        expect(data.path).toBeDefined();
        expect(data.timestamp).toBeDefined();
      });
  });

  it(`/POST create when authorized`, async () => {
    (assessmentServiceMock.create as Mock).mockImplementation(
      assessment => assessment,
    );
    (internalAssessmentGuardMock.canActivate as Mock).mockReturnValue(true);

    await request(app.getHttpServer())
      .post('/assessments')
      .set('Content-Type', 'application/json')
      .send({
        name: 'my-assessment',
        score: 50,
        idleTimeout: 20,
        status: 'closed',
      })
      .set('Accept', 'application/json')
      .expect(201)
      .then(response => {
        const data = response.body;
        const assessment = data;
        expect(assessment.name).toBe('my-assessment');
        expect(assessment.status).toBe('closed');
        expect(assessment.idleTimeout).toBe(20);
        expect(assessment.score).toBe(50);
      });
  });

  it(`/POST findAll when not authorized`, async () => {
    (internalAssessmentGuardMock.canActivate as Mock).mockReturnValue(false);

    await request(app.getHttpServer())
      .post('/assessments')
      .set('Content-Type', 'application/json')
      .send({
        name: 'my-assessment',
        score: 50,
        idleTimeout: 20,
        status: 'closed',
      })
      .set('Accept', 'application/json')
      .expect(403)
      .then(response => {
        const data = response.body;
        expect(data.error).toBe('Forbidden');
        expect(data.message).toBe('Forbidden resource');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
