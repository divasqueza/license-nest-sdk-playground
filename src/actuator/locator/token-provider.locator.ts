import { ProviderLocator } from './provider.locator';
import { ModuleRef } from '@nestjs/core';
import { Type } from '@nestjs/common';

export class TokenProviderLocator<T> extends ProviderLocator {
  constructor(
    protected readonly moduleRef: ModuleRef,
    private readonly token: Type<any> | string | any,
  ) {
    super(moduleRef);
  }

  get(): T {
    return super.lookup<T>(this.token);
  }
}
