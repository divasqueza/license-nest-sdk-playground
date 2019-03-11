import { Assessment } from '../models/assessment.model';
import { AssessmentRepository } from './assessment.repository';

/**
 * This repository doesnt need to mock anything, but the idea would be to mock
 * things like TypeOrm calls or api calls, etc.
 */
describe('AssessmentRepository', () => {
  it('save', async () => {
    const assessment = new Assessment();

    const assessmentRepository = new AssessmentRepository();
    const returned = await assessmentRepository.save(assessment);
    expect(returned.id).toBeDefined();
  });

  it('update', async () => {
    const assessment = new Assessment();

    const assessmentRepository = new AssessmentRepository();
    const returned = await assessmentRepository.update(assessment);
    expect(returned.isInProgress()).toBeTruthy();
  });

  it('findAll', async () => {
    const assessment = new Assessment();

    const assessmentRepository = new AssessmentRepository();
    const returned = await assessmentRepository.findAll();
    expect(returned.length).toBe(1);
  });
});
