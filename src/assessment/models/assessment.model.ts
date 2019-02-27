export class Assessment {
  id: number;

  name: string;

  status: string;

  score: number;

  constructor(assessment?: Partial<Assessment>) {
    this.id = assessment.id;
    this.name = assessment.name;
    this.status = assessment.status;
    this.score = assessment.score;
  }
}
