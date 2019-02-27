import { Module } from '@nestjs/common';
import { AssessmentDeliveryService } from './services/assessment-scoring.service';
import { AssessmentController } from './controllers/assessment.controller';
import { AssessmentService } from './services/assessment.service';
import { AssessmentRepository } from './repositories/assessment.repository';
import { InternalAssessmentGuard } from './guards/internal-assessment.guard';
import { AssessmentScoringHelper } from './helpers/assessment-scoring.helper';

@Module({
  providers: [
    InternalAssessmentGuard,
    AssessmentScoringHelper,
    AssessmentRepository,
    AssessmentDeliveryService,
    AssessmentService,
  ],
  controllers: [AssessmentController],
  exports: [AssessmentService, AssessmentDeliveryService],
})
export class AssessmentModule {}
