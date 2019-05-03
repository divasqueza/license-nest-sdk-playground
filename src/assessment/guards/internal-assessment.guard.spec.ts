import { InternalAssessmentGuard } from './internal-assessment.guard';
import { AssessmentConfiguration } from '../configuration/assessment.configuration';
import { mockExecutionContext } from '../../../test/util/mock.util';
import { mock } from '@greatminds/dp-testing-lib';

describe('InternalAssessmentGuard', () => {
  it('canActivate when the request has a valid user', async () => {
    const assessmentConfigurationMock = mock<AssessmentConfiguration>({
      freeForAll: false,
    });

    const executionContextMock = mockExecutionContext({
      user: { id: 1 },
    });

    jest.spyOn(executionContextMock, 'switchToHttp');

    const helper = new InternalAssessmentGuard(assessmentConfigurationMock);
    expect(helper.canActivate(executionContextMock)).toBeTruthy();

    expect(executionContextMock.switchToHttp).toHaveBeenCalledTimes(1);
  });

  it('canActivate when the request has no user but is free for all', async () => {
    const assessmentConfigurationMock = mock<AssessmentConfiguration>({
      freeForAll: true,
    });

    const executionContextMock = mockExecutionContext({});

    jest.spyOn(executionContextMock, 'switchToHttp');

    const helper = new InternalAssessmentGuard(assessmentConfigurationMock);
    expect(helper.canActivate(executionContextMock)).toBeTruthy();

    expect(executionContextMock.switchToHttp).toHaveBeenCalledTimes(1);
  });

  it('canActivate when the request has no user and is not free for all', async () => {
    const assessmentConfigurationMock = mock<AssessmentConfiguration>({
      freeForAll: false,
    });

    const executionContextMock = mockExecutionContext({});

    jest.spyOn(executionContextMock, 'switchToHttp');

    const helper = new InternalAssessmentGuard(assessmentConfigurationMock);
    expect(helper.canActivate(executionContextMock)).toBeFalsy();

    expect(executionContextMock.switchToHttp).toHaveBeenCalledTimes(1);
  });
});
