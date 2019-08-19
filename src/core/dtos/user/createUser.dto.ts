import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiModelProperty()
  name: string;

  @ApiModelProperty()
  login: string;

  @ApiModelProperty()
  email: string;

  @ApiModelProperty()
  password: string;
}
