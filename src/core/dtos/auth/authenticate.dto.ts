import { ApiModelProperty } from '@nestjs/swagger';

export class AuthenticateDto {
  @ApiModelProperty()
  login: string;
  @ApiModelProperty()
  password: string;
}
