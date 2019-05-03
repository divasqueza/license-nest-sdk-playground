import { mock } from '@greatminds/dp-testing-lib';
import { Assessment } from '../models/assessment.model';
import { AssessmentService } from '../services/assessment.service';
import { AssessmentController } from './assessment.controller';

describe('AssessmentController', () => {
  it('create', async () => {
    const assessment = new Assessment();
    const assessmentServiceMock = mock<AssessmentService>({
      create: jest.fn().mockResolvedValue(assessment),
    });

    jest.spyOn(assessmentServiceMock, 'create');

    const assessmentController = new AssessmentController(
      assessmentServiceMock,
    );
    const returned = await assessmentController.create(assessment);

    expect(returned).toBe(assessment);
    expect(assessmentServiceMock.create).toHaveBeenCalledWith(assessment);
  });

  it('findAll', async () => {
    const assessment = new Assessment({ id: 10 });
    const assessmentServiceMock = mock<AssessmentService>({
      findAll: jest.fn().mockResolvedValue([assessment]),
    });

    jest.spyOn(assessmentServiceMock, 'findAll');

    const assessmentController = new AssessmentController(
      assessmentServiceMock,
    );
    const returned = await assessmentController.findAll();

    expect(returned.length).toBe(1);
    expect(returned[0]).toBe(assessment);
    expect(assessmentServiceMock.findAll).toHaveBeenCalled();
  });
});
