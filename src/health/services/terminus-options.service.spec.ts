import { TerminusOptionsService } from './terminus-options.service';
import { mock } from '@greatminds/dp-testing-lib';
import { ServerIndicator } from './server-indicator.service';
import { HealthOptions } from '../options/health.options';

describe('TerminusOptionsService', () => {
  const healthOptionsMock: HealthOptions = {
    healthCheckUrl: 'any-url',
  };
  describe('createTerminusOptions', () => {
    it('should return the entire url and indicators', async () => {
      const serverIndicatorMock = mock<ServerIndicator>({
        check: jest.fn().mockReturnValue('some string'),
      });

      const terminusService = new TerminusOptionsService(
        serverIndicatorMock,
        healthOptionsMock,
      );

      const result = terminusService.createTerminusOptions();
      expect(result).hasOwnProperty('endpoints');
      expect(result.endpoints).toHaveLength(1);
      expect(result.endpoints[0].url).toBe('any-url');
      expect(result.endpoints[0].healthIndicators).toHaveLength(1);
    });
  });

  describe('getHealthIndicators', () => {
    it('should return the health indicator by default', async () => {
      const serverIndicatorMock = mock<ServerIndicator>({
        check: jest.fn().mockReturnValue('some string'),
      });

      const terminusService = new TerminusOptionsService(
        serverIndicatorMock,
        healthOptionsMock,
      );

      const result = terminusService.getHealthIndicators();
      expect(result).toBeDefined();
      expect(result).toHaveLength(1);
    });
    it('should check the server at the health indicator', async () => {
      const serverIndicatorMock = mock<ServerIndicator>({
        check: jest.fn().mockReturnValue('some string'),
      });

      const terminusService = new TerminusOptionsService(
        serverIndicatorMock,
        healthOptionsMock,
      );

      const result = terminusService.getHealthIndicators();
      expect(result).toBeDefined();
      expect(result).toHaveLength(1);

      const checkValue = await result[0]();
      expect(serverIndicatorMock.check).toHaveBeenCalledWith('server');
      expect(checkValue).toBe('some string');
    });
  });

  describe('getHealthUrl', () => {
    it('should return the default url', async () => {
      const serverIndicatorMock = mock<ServerIndicator>({
        check: jest.fn().mockReturnValue('some string'),
      });

      const terminusService = new TerminusOptionsService(
        serverIndicatorMock,
        {},
      );

      const result = terminusService.getHealthUrl();
      expect(result).toEqual('/health');
    });
    it('should return the provided url', async () => {
      const serverIndicatorMock = mock<ServerIndicator>({
        check: jest.fn().mockReturnValue('some string'),
      });

      const terminusService = new TerminusOptionsService(
        serverIndicatorMock,
        healthOptionsMock,
      );

      const result = terminusService.getHealthUrl();
      expect(result).toEqual('any-url');
    });
  });
});
