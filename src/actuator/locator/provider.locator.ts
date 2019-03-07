import { Type } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

export class ProviderLocator {
  constructor(protected readonly moduleRef: ModuleRef) {}

  lookup<T>(token: Type<any> | string | any, global: boolean = true): T {
    return this.moduleRef.get(token, { strict: !global });
  }
}
