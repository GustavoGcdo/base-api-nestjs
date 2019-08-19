import { ApiModelPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiModelPropertyOptional()
  name?: string;

  @ApiModelPropertyOptional()
  login?: string;

  @ApiModelPropertyOptional()
  email?: string;

  @ApiModelPropertyOptional()
  dataNascimento?: string;

  @ApiModelPropertyOptional()
  preference?: string;

  @ApiModelPropertyOptional()
  isAdmin?: boolean;

  @ApiModelPropertyOptional()
  profile?: string;
}
