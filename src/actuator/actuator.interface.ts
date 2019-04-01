import { HealthIndicator } from './model/health-indicator.model';
import { ApplicationInfo } from './model/application-info.model';

export interface Actuator {
  /**
   * Returns information about the application health.
   *
   * @returns {HealthIndicator[]}
   */
  getHealthIndicators(): HealthIndicator[];

  /**
   * Retrieves the application information
   * @returns {ApplicationInfo}
   */
  getApplicationInfo(): Partial<ApplicationInfo>;
}
