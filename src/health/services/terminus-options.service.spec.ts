import { TerminusOptionsService } from './terminus-options.service';
import { mock } from '@greatminds/dp-testing-lib';
import { ServerIndicator } from './server-indicator.service';

describe('TerminusOptionsService', () => {
  describe('createTerminusOptions', () => {
    it('should return the entire url and indicators', async () => {
      const serverIndicatorMock = mock<ServerIndicator>({
        check: jest.fn().mockReturnValue('some string'),
      });

      const terminusService = new TerminusOptionsService(serverIndicatorMock);

      const result = terminusService.createTerminusOptions();
      expect(result).hasOwnProperty('endpoints');
      expect(result.endpoints).toHaveLength(1);
      expect(result.endpoints[0].url).toBe('/health');
      expect(result.endpoints[0].healthIndicators).toHaveLength(1);
    });
  });

  describe('getHealthIndicators', () => {
    it('should return the health indicator by default', async () => {
      const serverIndicatorMock = mock<ServerIndicator>({
        check: jest.fn().mockReturnValue('some string'),
      });

      const terminusService = new TerminusOptionsService(serverIndicatorMock);

      const result = terminusService.getHealthIndicators();
      expect(result).toBeDefined();
      expect(result).toHaveLength(1);
    });
  });

  describe('createTerminusOptions', () => {
    it('should return health as the default url', async () => {
      const serverIndicatorMock = mock<ServerIndicator>({
        check: jest.fn().mockReturnValue('some string'),
      });

      const terminusService = new TerminusOptionsService(serverIndicatorMock);

      const result = terminusService.getHealthUrl();
      expect(result).toEqual('/health');
    });
  });
});
