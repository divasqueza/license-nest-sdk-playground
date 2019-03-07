import { Injectable, Type } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class ProviderLocator {
  constructor(private readonly moduleRef: ModuleRef) {}

  get<T>(token: Type<any> | string | any, global: boolean = true): T {
    return this.moduleRef.get(token, { strict: !global });
  }
}
