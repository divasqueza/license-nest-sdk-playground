import { Injectable } from '@nestjs/common';
import { ConfigurationService } from '../../configuration/services/configuration.service';

/**
 * This class encapsulates how assessment micro app properties are retrieved and accessed by other modules.
 * It provides a type-safe approach to retrieve application properties, it also defines default values.
 *
 * @author javier.perez
 */
@Injectable()
export class AssessmentConfiguration {
  constructor(private readonly configuration: ConfigurationService) {}

  get allowExternalAssessments(): boolean {
    // for this example the configuration module only handles strings and environment variables
    return this.configuration.get('ALLOW_EXTERNAL_ASSESSMENTS') === 'true';
  }

  get idleTimeout(): number {
    const assessmentIdleTimeout = this.configuration.get(
      'ASSESSMENT_IDLE_TIMEOUT',
    );
    return assessmentIdleTimeout ? +assessmentIdleTimeout : 10;
  }
}
