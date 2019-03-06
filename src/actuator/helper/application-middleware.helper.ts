import { INestApplication, Injectable } from '@nestjs/common';
import session = require('cookie-session');
import * as csurf from 'csurf';
import * as cors from 'cors';
import * as compression from 'compression';
import * as helmet from 'helmet';

/**
 * Suggested security and performance settings for micro apps.
 */
@Injectable()
export class ApplicationMiddlewareHelper {
  setupMiddlewares(app: INestApplication, options?: any) {
    this.setupWebVulnerabilities(app, options.helmet);
    this.setupSessionManagement(app, options.session);
    this.setupCSRF(app, options.csrf);
    this.setupCORS(app, options.cors);
    this.setupCompression(app, options.compress);
  }

  /**
   * Adds a middleware to prevent web attacks
   * See {@link https://helmetjs.github.io/docs}
   * @param {INestApplication} app
   * @param options
   */
  setupWebVulnerabilities(app: INestApplication, options?: any) {
    options = options || {}; // TODO define defaults
    app.use(helmet(options));
  }

  /**
   * Setups the session management middleware.
   * See {@link https://www.npmjs.com/package/cookie-session}
   * @param {INestApplication} app
   * @param options
   */
  setupSessionManagement(app: INestApplication, options?: any) {
    options = options || {
      // TODO define defaults
      name: 'session',
      keys: ['gm-key', 'gm-key-2'], // TODO define keys
      cookie: {
        secure: false,
        httpOnly: false,
        expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
      },
    };
    app.use(session(options));
  }

  /**
   * Adds middleware to prevent CSRF attacks.
   * See {@link https://github.com/expressjs/csurf}
   * @param {INestApplication} app
   * @param options
   */
  setupCSRF(app: INestApplication, options?: any) {
    options = options || {}; // TODO define defaults
    app.use(csurf(options));
  }

  /**
   * Adds a middleware to setup CORS
   * See {@link https://github.com/expressjs/cors}
   * @param {INestApplication} app
   * @param options
   */
  setupCORS(app: INestApplication, options?: any) {
    options = options || {}; // TODO define defaults
    app.use(cors(options));
  }

  /**
   * Adds a middleware for response compression
   * See {@link https://github.com/expressjs/compression}
   * @param {INestApplication} app
   * @param options
   */
  setupCompression(app: INestApplication, options?: any) {
    options = options || {}; // TODO define defaults
    app.use(compression(options));
  }
}
