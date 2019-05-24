import { Injectable } from '@nestjs/common';
import { HealthIndicator } from '@nestjs/terminus';

/* TODO: use @ts-ignore when the is fixed https://github.com/Microsoft/TypeScript/issues/19139 */
/* tslint:disable-next-line */
const packageJson = require('../../../package.json');

/**
 * Checks if the server is running
 * and returns a result object corresponding to the result
 * @param key The key which will be used for the result object
 *
 * @example
 * assessmentServer.check('server')
 * Returns { server: { status: 'up', version: '#.#.#' } }
 */
@Injectable()
export class ServerIndicator extends HealthIndicator {
  public check(key: string) {
    const isHealthy = true;
    return super.getStatus(key, isHealthy, { version: packageJson.version });
  }
}
