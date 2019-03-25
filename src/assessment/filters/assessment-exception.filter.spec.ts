import { mockExecutionContext } from '../../../test/util/mock.util';
import { AssessmentExceptionFilter } from './assessment-exception.filter';
import { InvalidAssessmentStatusException } from '../exceptions/invalid-assessment-status.exception';

describe('AssessmentExceptionFilter', () => {
  it('catch', async () => {
    const exception = new InvalidAssessmentStatusException(
      'Assessment is closed',
    );
    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockImplementation(body => {
        expect(body.statusCode).toBe(400);
        expect(body.timestamp).toBeDefined();
        expect(body.path).toBe('any-url');
      }),
    };
    const request = {
      url: 'any-url',
    };
    const executionContext = mockExecutionContext(request, response);
    const filter = new AssessmentExceptionFilter();
    filter.catch(exception, executionContext);

    expect(response.status).toHaveBeenCalled();
    expect(response.json).toHaveBeenCalled();
  });
});
