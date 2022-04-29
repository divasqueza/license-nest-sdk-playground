import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { UserInterceptor } from './user.interceptor';
import { WithLicenseToProducts } from '@greatminds/dp-license-nestjs-sdk';

@Controller()
export class TestController {
  @Get('/')
  @WithLicenseToProducts(['affirm'])
  @UseInterceptors(UserInterceptor)
  validateAccess() {
    return { message: 'You have access!' };
  }
}
