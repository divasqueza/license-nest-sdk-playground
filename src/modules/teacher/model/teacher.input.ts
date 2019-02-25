
import { ApiModelProperty } from '@nestjs/swagger';

export class TeacherInput {

    @ApiModelProperty()
    public readonly firstName: string;

    @ApiModelProperty()
    public readonly lastName: string;

}
