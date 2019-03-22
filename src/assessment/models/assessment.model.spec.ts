import { Assessment } from './assessment.model';

describe('Assessment - Model', () => {
  it('constructor', async () => {
    const assessment = new Assessment({
      id: 1,
      name: 'any-name',
      status: 'closed',
      score: 10,
      idleTimeout: 20,
    });

    expect(assessment.id).toBe(1);
    expect(assessment.name).toBe('any-name');
    expect(assessment.status).toBe('closed');
    expect(assessment.score).toBe(10);
    expect(assessment.idleTimeout).toBe(20);
  });

  it('isInProgress when status is undefined', async () => {
    const assessment = new Assessment();
    expect(assessment.isInProgress()).toBeFalsy();
  });

  it('isInProgress when having a different status', async () => {
    const assessment = new Assessment({
      status: 'any-status',
    });
    expect(assessment.isInProgress()).toBeFalsy();
  });

  it('isInProgress with expected status', async () => {
    const assessment = new Assessment({
      status: 'in-progress',
    });
    expect(assessment.isInProgress()).toBeTruthy();
  });

  it('isClosed when status is undefined', async () => {
    const assessment = new Assessment();
    expect(assessment.isClosed()).toBeFalsy();
  });

  it('isClosed when having a different status', async () => {
    const assessment = new Assessment({
      status: 'any-status',
    });
    expect(assessment.isClosed()).toBeFalsy();
  });

  it('isClosed with expected status', async () => {
    const assessment = new Assessment({
      status: 'closed',
    });
    expect(assessment.isClosed()).toBeTruthy();
  });

  it('isActive when status is undefined', async () => {
    const assessment = new Assessment();
    expect(assessment.isActive()).toBeFalsy();
  });

  it('isActive when having a different status', async () => {
    const assessment = new Assessment({
      status: 'any-status',
    });
    expect(assessment.isActive()).toBeFalsy();
  });

  it('isActive with expected status', async () => {
    const assessment = new Assessment({
      status: 'active',
    });
    expect(assessment.isActive()).toBeTruthy();
  });

  it('hasScore when score is undefined', async () => {
    const assessment = new Assessment();
    expect(assessment.hasScore()).toBeFalsy();
  });

  it('hasScore when score is 0', async () => {
    const assessment = new Assessment({
      score: 0,
    });
    expect(assessment.hasScore()).toBeFalsy();
  });

  it('hasScore when score is greater than 0', async () => {
    const assessment = new Assessment({
      score: 10,
    });
    expect(assessment.hasScore()).toBeTruthy();
  });
});
