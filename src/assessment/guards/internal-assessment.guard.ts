import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class InternalAssessmentGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    // do something here to check it is an internal assessment
    return true;
  }
}
