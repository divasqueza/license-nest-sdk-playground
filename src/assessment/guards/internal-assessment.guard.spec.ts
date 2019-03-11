import { InternalAssessmentGuard } from './internal-assessment.guard';
import { AssessmentConfiguration } from '../configuration/assessment.configuration';
import { mock, mockExecutionContext } from '../../../test/util/mock.util';

describe('InternalAssessmentGuard', () => {
  it('canActivate when the request has a valid user', async () => {
    const assessmentConfigurationMock = mock<AssessmentConfiguration>({
      allowExternalAssessments: false,
    });

    const executionContextMock = mockExecutionContext({
      user: { id: 1 },
    });

    jest.spyOn(executionContextMock, 'switchToHttp');

    const helper = new InternalAssessmentGuard(assessmentConfigurationMock);
    expect(helper.canActivate(executionContextMock)).toBeTruthy();

    expect(executionContextMock.switchToHttp).toHaveBeenCalledTimes(1);
  });

  it('canActivate when the request has no user but external assessments are allowed', async () => {
    const assessmentConfigurationMock = mock<AssessmentConfiguration>({
      allowExternalAssessments: true,
    });

    const executionContextMock = mockExecutionContext({});

    jest.spyOn(executionContextMock, 'switchToHttp');

    const helper = new InternalAssessmentGuard(assessmentConfigurationMock);
    expect(helper.canActivate(executionContextMock)).toBeTruthy();

    expect(executionContextMock.switchToHttp).toHaveBeenCalledTimes(1);
  });

  it('canActivate when the request has no user and external assessments are not allowed', async () => {
    const assessmentConfigurationMock = mock<AssessmentConfiguration>({
      allowExternalAssessments: false,
    });

    const executionContextMock = mockExecutionContext({});

    jest.spyOn(executionContextMock, 'switchToHttp');

    const helper = new InternalAssessmentGuard(assessmentConfigurationMock);
    expect(helper.canActivate(executionContextMock)).toBeFalsy();

    expect(executionContextMock.switchToHttp).toHaveBeenCalledTimes(1);
  });
});
