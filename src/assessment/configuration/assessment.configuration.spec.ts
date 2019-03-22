import { mock } from '../../../test/util/mock.util';
import { ConfigurationService } from '../../configuration/services/configuration.service';
import { AssessmentConfiguration } from './assessment.configuration';

describe('AssessmentConfiguration', () => {
  it('allowExternalAssessments', async () => {
    const configurationServiceMock = mock<ConfigurationService>({
      get: jest.fn().mockReturnValue('true'),
    });

    jest.spyOn(configurationServiceMock, 'get');

    const assessmentConfiguration = new AssessmentConfiguration(
      configurationServiceMock,
    );
    expect(assessmentConfiguration.allowExternalAssessments).toBeTruthy();

    expect(configurationServiceMock.get).toHaveBeenCalledTimes(1);
    expect(configurationServiceMock.get).toHaveBeenCalledWith(
      'ALLOW_EXTERNAL_ASSESSMENTS',
    );
  });

  it('allowExternalAssessments when not enabled', async () => {
    const configurationServiceMock = mock<ConfigurationService>({
      get: jest.fn().mockReturnValue(undefined),
    });

    jest.spyOn(configurationServiceMock, 'get');

    const assessmentConfiguration = new AssessmentConfiguration(
      configurationServiceMock,
    );
    expect(assessmentConfiguration.allowExternalAssessments).toBeFalsy();

    expect(configurationServiceMock.get).toHaveBeenCalledTimes(1);
    expect(configurationServiceMock.get).toHaveBeenCalledWith(
      'ALLOW_EXTERNAL_ASSESSMENTS',
    );
  });

  it('idleTimeout', async () => {
    const configurationServiceMock = mock<ConfigurationService>({
      get: jest.fn().mockReturnValue('20'),
    });

    jest.spyOn(configurationServiceMock, 'get');

    const assessmentConfiguration = new AssessmentConfiguration(
      configurationServiceMock,
    );
    expect(assessmentConfiguration.idleTimeout).toBe(20);

    expect(configurationServiceMock.get).toHaveBeenCalledTimes(1);
    expect(configurationServiceMock.get).toHaveBeenCalledWith(
      'ASSESSMENT_IDLE_TIMEOUT',
    );
  });

  it('idleTimeout when defined', async () => {
    const configurationServiceMock = mock<ConfigurationService>({
      get: jest.fn().mockReturnValue(undefined),
    });

    jest.spyOn(configurationServiceMock, 'get');

    const assessmentConfiguration = new AssessmentConfiguration(
      configurationServiceMock,
    );
    expect(assessmentConfiguration.idleTimeout).toBe(10);

    expect(configurationServiceMock.get).toHaveBeenCalledTimes(1);
    expect(configurationServiceMock.get).toHaveBeenCalledWith(
      'ASSESSMENT_IDLE_TIMEOUT',
    );
  });
});
