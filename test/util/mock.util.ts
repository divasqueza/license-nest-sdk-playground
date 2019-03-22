import { ExecutionContext } from '@nestjs/common';

const mock =  <T> (options: Partial<T>): T => {
  return jest.fn(() => options as T)();
};

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
  mock,
  mockExecutionContext,
};
