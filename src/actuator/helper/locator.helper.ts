import { ProviderLocator } from '../provider.locator';
import { Inject, Injectable, Type } from '@nestjs/common';
import { Actuator } from '../actuator.interface';

@Injectable()
export class LocatorHelper {
  constructor(
    private readonly providerLocator: ProviderLocator,
    @Inject('ActuatorToken')
    private readonly actuatorToken: Type<any> | string | any,
  ) {}

  get actuator(): Actuator {
    return this.providerLocator.get<Actuator>(this.actuatorToken);
  }
}
