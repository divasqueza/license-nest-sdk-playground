import { mock } from '@greatminds/dp-testing-lib';
import { AssessmentScoringService } from './assessment-scoring.service';
import { AssessmentService } from './assessment.service';
import { AssessmentScoringHelper } from '../helpers/assessment-scoring.helper';
import { Assessment } from '../models/assessment.model';

describe('AssessmentScoringService', () => {
  it('grade, when has no score', async () => {
    const assessment = new Assessment();
    const assessmentServiceMock = mock<AssessmentService>({
      update: jest.fn().mockResolvedValue(assessment),
    });

    const assessScoringHelperMock = mock<AssessmentScoringHelper>({
      calculateScore: jest.fn().mockReturnValue(100),
    });

    jest.spyOn(assessmentServiceMock, 'update');
    jest.spyOn(assessScoringHelperMock, 'calculateScore');

    const assessmentScoringService = new AssessmentScoringService(
      assessmentServiceMock,
      assessScoringHelperMock,
    );
    const returned = await assessmentScoringService.grade(assessment);
    expect(returned).toBeDefined();

    expect(returned.score).toBe(100);
    expect(assessmentServiceMock.update).toHaveBeenCalledWith(assessment);
    expect(assessScoringHelperMock.calculateScore).toHaveBeenCalledWith(
      assessment,
    );
  });

  it('grade, when has score', async () => {
    const assessment = new Assessment({ score: 50 });
    const assessmentServiceMock = mock<AssessmentService>({
      update: jest.fn().mockResolvedValue(assessment),
    });

    const assessScoringHelperMock = mock<AssessmentScoringHelper>({
      calculateScore: jest.fn().mockReturnValue(100),
    });

    jest.spyOn(assessmentServiceMock, 'update');
    jest.spyOn(assessScoringHelperMock, 'calculateScore');

    const assessmentScoringService = new AssessmentScoringService(
      assessmentServiceMock,
      assessScoringHelperMock,
    );
    const returned = await assessmentScoringService.grade(assessment);
    expect(returned).toBeDefined();

    expect(returned.score).toBe(50);
    expect(assessmentServiceMock.update).not.toHaveBeenCalled();
    expect(assessScoringHelperMock.calculateScore).not.toHaveBeenCalled();
  });
});
