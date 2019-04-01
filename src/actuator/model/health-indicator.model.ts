export class HealthIndicator {
  up: boolean;

  reason: string;

  name: string;

  extra: any;

  constructor(indicator: Partial<HealthIndicator>) {
    this.up = indicator.up;
    this.reason = indicator.reason;
    this.name = indicator.name;
    this.name = indicator.extra;
  }
}
