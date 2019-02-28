import { Injectable } from '@nestjs/common';
import { Assessment } from '../models/assessment.model';

/**
 * It is charge of accessing assessment data. This is an memory implementation repository which means data
 * changes would be lost when the application is restarted. Look for other implementations if you want to persists
 * the data.
 *
 * @author javier.perez
 */
@Injectable()
export class AssessmentRepository {
  /**
   * Saves a new assessment (at memory). It generates a non unique identifier using a Math random algorithm.
   * @param {Assessment} assessment
   * @returns {Promise<Assessment>}
   */
  async save(assessment: Assessment): Promise<Assessment> {
    assessment.id = Math.random();
    return assessment;
  }

  async update(assessment: Assessment): Promise<Assessment> {
    assessment.status = 'in-progress'; // TODO create assessment status enumeration.
    return assessment;
  }

  async findAll(): Promise<Assessment[]> {
    return [new Assessment({ name: 'Math I', status: 'active' })];
  }
}
