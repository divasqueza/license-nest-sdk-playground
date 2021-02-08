import { TerminusOptionsService } from './terminus-options.service';
import { mock } from '@greatminds/dp-testing-lib';
import { ServerIndicator } from './server-indicator.service';
import { HealthOptions } from '../options/health.options';
import { HeapUsedIndicator } from './heap-indicator.service';
import { SystemCPUIndicator } from './cpu-indicator.service';
import { EventLoopIndicator } from './event-loop-indicator.service';

describe('TerminusOptionsService', () => {
  const healthOptionsMock: HealthOptions = {
    readinessCheckUrl: 'any-url',
    livenessCheckUrl: 'any-url',
  };

  function getIndicatorMocks() {
    return {
      serverIndicatorMock: mock<ServerIndicator>({
        check: jest.fn().mockReturnValue('some string'),
      }),
      heapIndicatorMock: mock<HeapUsedIndicator>({
        check: jest.fn().mockReturnValue('some string'),
      }),
      cpuIndicatorMock: mock<SystemCPUIndicator>({
        check: jest.fn().mockReturnValue('some string'),
      }),
      eventLoopIndicatorMock: mock<EventLoopIndicator>({
        check: jest.fn().mockReturnValue('some string'),
      }),
    };
  }

  describe('createTerminusOptions', () => {
    it('should return the entire url and indicators', async () => {
      const mocks = getIndicatorMocks();

      const terminusService = new TerminusOptionsService(
        mocks.serverIndicatorMock,
        mocks.heapIndicatorMock,
        mocks.cpuIndicatorMock,
        mocks.eventLoopIndicatorMock,
        healthOptionsMock,
      );

      const result = terminusService.createTerminusOptions();
      expect(result).toMatchObject({
        endpoints: [
          {
            url: 'any-url',
            healthIndicators: [
              expect.any(Function),
              expect.any(Function),
              expect.any(Function),
            ],
          },
          {
            url: 'any-url',
            healthIndicators: [expect.any(Function)],
          },
        ],
      });
    });
  });

  describe('getHealthIndicators', () => {
    it('should return the health indicator by default', async () => {
      const mocks = getIndicatorMocks();

      const terminusService = new TerminusOptionsService(
        mocks.serverIndicatorMock,
        mocks.heapIndicatorMock,
        mocks.cpuIndicatorMock,
        mocks.eventLoopIndicatorMock,
        healthOptionsMock,
      );

      const result = terminusService.getReadinessIndicators();
      expect(result).toBeDefined();
      expect(result).toHaveLength(1);
    });
    it('should check the server at the health indicator', async () => {
      const mocks = getIndicatorMocks();

      const terminusService = new TerminusOptionsService(
        mocks.serverIndicatorMock,
        mocks.heapIndicatorMock,
        mocks.cpuIndicatorMock,
        mocks.eventLoopIndicatorMock,
        healthOptionsMock,
      );

      const result = terminusService.getReadinessIndicators();
      expect(result).toBeDefined();
      expect(result).toHaveLength(1);

      const checkValue = await result[0]();
      expect(mocks.serverIndicatorMock.check).toHaveBeenCalledWith('server');
      expect(checkValue).toBe('some string');
    });
  });

  describe('getReadinessUrl', () => {
    it('should return the default url', async () => {
      const mocks = getIndicatorMocks();

      const terminusService = new TerminusOptionsService(
        mocks.serverIndicatorMock,
        mocks.heapIndicatorMock,
        mocks.cpuIndicatorMock,
        mocks.eventLoopIndicatorMock,
        {},
      );

      const result = terminusService.getReadinessUrl();
      expect(result).toEqual('/health/readiness');
    });
    it('should return the provided url', async () => {
      const mocks = getIndicatorMocks();

      const terminusService = new TerminusOptionsService(
        mocks.serverIndicatorMock,
        mocks.heapIndicatorMock,
        mocks.cpuIndicatorMock,
        mocks.eventLoopIndicatorMock,
        healthOptionsMock,
      );

      const result = terminusService.getReadinessUrl();
      expect(result).toEqual('any-url');
    });
  });
  describe('getLivenessUrl', () => {
    it('should return the default url', async () => {
      const mocks = getIndicatorMocks();

      const terminusService = new TerminusOptionsService(
        mocks.serverIndicatorMock,
        mocks.heapIndicatorMock,
        mocks.cpuIndicatorMock,
        mocks.eventLoopIndicatorMock,
        {},
      );

      const result = terminusService.getLivenessUrl();
      expect(result).toEqual('/health/liveness');
    });
    it('should return the provided url', async () => {
      const mocks = getIndicatorMocks();

      const terminusService = new TerminusOptionsService(
        mocks.serverIndicatorMock,
        mocks.heapIndicatorMock,
        mocks.cpuIndicatorMock,
        mocks.eventLoopIndicatorMock,
        healthOptionsMock,
      );

      const result = terminusService.getLivenessUrl();
      expect(result).toEqual('any-url');
    });
  });
});
