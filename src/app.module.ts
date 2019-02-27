import { Module } from '@nestjs/common';
import { AssessmentModule } from './assessment/assessment.module';

@Module({
  imports: [AssessmentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
