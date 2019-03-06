import { Module } from '@nestjs/common';
import { AssessmentModule } from './assessment/assessment.module';

/**
 * Prevent comments like this... they dont provide any useful information, it is redundant.
 *
 * Application module.
 */
@Module({
  imports: [AssessmentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
