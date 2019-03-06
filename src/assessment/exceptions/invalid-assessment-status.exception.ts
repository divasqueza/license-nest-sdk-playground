/**
 * Indicates the assessment is in an invalid state to perform a specific action.
 *
 * @author javier.perez
 */
export class InvalidAssessmentStatusException extends Error {
  constructor(message: string) {
    super(message);
  }
}
