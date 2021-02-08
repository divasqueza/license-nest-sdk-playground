/**
 * Options to configure the Health Module
 *
 * @property {string} healthCheckUrl          - indicates the health check url, default's to /health
 */
export interface HealthOptions {
  readinessCheckUrl?: string;
  livenessCheckUrl?: string;
}
