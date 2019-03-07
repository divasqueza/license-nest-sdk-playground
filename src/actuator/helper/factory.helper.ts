import { OnModuleInit, Type } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

export class FactoryHelper<T> implements OnModuleInit {

  instance: T;

  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly token: Type<any> | string | symbol,
  ) {}

  onModuleInit() {
    this.instance = this.moduleRef.get(this.token, { strict: false });
  }
}
