import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

/**
 * This guard is used to make sure api calls are only receiving internal assessments, other assessments
 * like external assessments are not supported and the request should be forbidden.
 *
 * @author javier.perez
 */
@Injectable()
export class InternalAssessmentGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    // TODO check it is an internal assessment
    return true;
  }
}
