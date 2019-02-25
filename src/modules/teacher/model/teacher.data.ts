
import { ApiModelProperty } from '@nestjs/swagger';

export class TeacherData {

    @ApiModelProperty()
    public readonly id: number;

    @ApiModelProperty()
    public readonly firstName: string;

    @ApiModelProperty()
    public readonly lastName: string;

}
