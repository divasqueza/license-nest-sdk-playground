import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AssessmentConfiguration } from '../configuration/assessment.configuration';

/**
 * This guard is used to make sure api calls are only receiving internal assessments, other assessments
 * like external assessments are not supported and the request should be forbidden.
 *
 * @author javier.perez
 */
@Injectable()
export class InternalAssessmentGuard implements CanActivate {
  constructor(
    private readonly assessmentConfiguration: AssessmentConfiguration,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return user || this.assessmentConfiguration.allowExternalAssessments;
  }
}
