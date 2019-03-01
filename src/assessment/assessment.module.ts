import { Module } from '@nestjs/common';
import { AssessmentDeliveryService } from './services/assessment-scoring.service';
import { AssessmentController } from './controllers/assessment.controller';
import { AssessmentService } from './services/assessment.service';
import { AssessmentRepository } from './repositories/assessment.repository';
import { InternalAssessmentGuard } from './guards/internal-assessment.guard';
import { AssessmentScoringHelper } from './helpers/assessment-scoring.helper';
import { AssessmentConfiguration } from './configuration/assessment.configuration';

/**
 * This module encapsulate all assessment related functionality, it handles CRUD operations but also assessment scoring
 * and delivery logic.
 * It encapsulates assessment data repositories but exposes some of the assessment services.
 *
 * @author javier.perez
 */
@Module({
  providers: [
    InternalAssessmentGuard,
    AssessmentScoringHelper,
    AssessmentRepository,
    AssessmentDeliveryService,
    AssessmentService,
    AssessmentConfiguration,
  ],
  controllers: [AssessmentController],
  exports: [AssessmentService, AssessmentDeliveryService],
})
export class AssessmentModule {}
