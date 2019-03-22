import { AssessmentException } from './assessment.exception';
import { HttpStatus } from '@nestjs/common';

/**
 * Indicates the assessment is in an invalid state to perform a specific action.
 *
 * @author javier.perez
 */
export class InvalidAssessmentStatusException extends AssessmentException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
