import { Injectable } from '@nestjs/common';
import * as nconf from 'nconf';

/**
 * This is a memory(nconf) configuration repository. It holds application properties loaded from environment variables.
 * The future configuration package will load properties from arguments, developer configuration files and a remote storage.
 *
 * @author javier.perez
 */
@Injectable()
export class ConfigurationRepository {
  constructor() {
    nconf.env();
  }

  get(key: string): string {
    return nconf.get(key);
  }
}
