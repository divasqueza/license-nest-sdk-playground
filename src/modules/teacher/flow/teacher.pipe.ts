
import * as Joi from 'joi';
import { JoiValidationPipe } from '../../common';
import { Teacher } from '../model';

export class TeacherPipe extends JoiValidationPipe {

    public buildSchema(): object {

        return Joi.object({
            firstName: Joi.string().required().max(Teacher.NAME_LENGTH),
            lastName: Joi.string().required().max(Teacher.NAME_LENGTH)
        });

    }
}
