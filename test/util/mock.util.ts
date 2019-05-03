import { ExecutionContext } from '@nestjs/common';
import { mock } from '@greatminds/dp-testing-lib';

const mockExecutionContext = (request?: any, response?: any): ExecutionContext => {
  const httpContextMock = {
    getRequest: jest.fn().mockReturnValue(request),
    getResponse: jest.fn().mockReturnValue(response),
  };

  return mock<ExecutionContext>({
    switchToHttp: jest.fn().mockReturnValue(httpContextMock),
  });
};

export {
  mockExecutionContext,
};
