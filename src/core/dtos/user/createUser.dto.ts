import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiModelProperty({ required: true })
  name: string;

  @ApiModelProperty({ required: true })
  login: string;

  @ApiModelProperty({ required: true })
  email: string;

  @ApiModelProperty({ required: false })
  password: string;
}
