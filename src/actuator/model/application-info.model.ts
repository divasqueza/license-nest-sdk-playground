export class ApplicationInfo {
  name: string;

  description: string;

  version: string;

  extra: any;

  constructor(info: Partial<ApplicationInfo>) {
    this.name = info.name;
    this.description = info.description;
    this.version = info.version;
    this.extra = info.extra;
  }
}
