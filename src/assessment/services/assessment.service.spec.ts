import { mock } from '@greatminds/dp-testing-lib';
import { Assessment } from '../models/assessment.model';
import { AssessmentRepository } from '../repositories/assessment.repository';
import { AssessmentConfiguration } from '../configuration/assessment.configuration';
import { LoggerService } from '@greatminds/dp-logger-lib';
import { AssessmentService } from './assessment.service';

describe('AssessmentService', () => {
  it('create, when has no idleTimeout', async () => {
    const assessment = new Assessment();
    const assessmentRepositoryMock = mock<AssessmentRepository>({
      save: jest.fn().mockResolvedValue(assessment),
    });

    const assessmentConfigurationMock = mock<AssessmentConfiguration>({
      idleTimeout: 10,
    });

    const loggerServiceMock = mock<LoggerService>({
      info: jest.fn(),
    });

    jest.spyOn(assessmentRepositoryMock, 'save');
    jest.spyOn(loggerServiceMock, 'info');

    const assessmentService = new AssessmentService(
      assessmentRepositoryMock,
      assessmentConfigurationMock,
      loggerServiceMock,
    );
    const returned = await assessmentService.create(assessment);

    expect(returned.idleTimeout).toBe(10);
    expect(assessmentRepositoryMock.save).toHaveBeenCalledWith(assessment);
    expect(loggerServiceMock.info).toHaveBeenCalled();
  });

  it('create, when has idleTimeout', async () => {
    const assessment = new Assessment({ idleTimeout: 20 });
    const assessmentRepositoryMock = mock<AssessmentRepository>({
      save: jest.fn().mockResolvedValue(assessment),
    });

    const assessmentConfigurationMock = mock<AssessmentConfiguration>({
      idleTimeout: 10,
    });

    const loggerServiceMock = mock<LoggerService>({
      info: jest.fn(),
    });

    jest.spyOn(assessmentRepositoryMock, 'save');
    jest.spyOn(loggerServiceMock, 'info');

    const assessmentService = new AssessmentService(
      assessmentRepositoryMock,
      assessmentConfigurationMock,
      loggerServiceMock,
    );
    const returned = await assessmentService.create(assessment);

    expect(returned.idleTimeout).toBe(20);
    expect(assessmentRepositoryMock.save).toHaveBeenCalledWith(assessment);
    expect(loggerServiceMock.info).not.toHaveBeenCalled();
  });
});
