export class Assessment {
  id: number;

  name: string;

  /**
   * It holds the assessment status, possible values are active, closed, in-progress.
   *
   */
  status: string; // TODO create assessment status enumeration.

  /**
   * It holds the assessment score, -1 or empty means that the assessment has not been scored
   */
  score: number;

  hasScore() {
    return !!this.score;
  }

  isActive() {
    return this.status === 'active';
  }

  isClosed() {
    return this.status === 'closed';
  }

  isInProgress() {
    return this.status === 'in-progress';
  }

  constructor(assessment?: Partial<Assessment>) {
    this.id = assessment.id;
    this.name = assessment.name;
    this.status = assessment.status;
    this.score = assessment.score;
  }
}
