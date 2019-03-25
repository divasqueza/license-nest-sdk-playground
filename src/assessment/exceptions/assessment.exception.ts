/**
 * Base assessment exception.
 *
 * @author javier.perez
 */
import { HttpException } from '@nestjs/common';

export class AssessmentException extends HttpException {
  constructor(message: string, status: number) {
    super(message, status);
  }
}
