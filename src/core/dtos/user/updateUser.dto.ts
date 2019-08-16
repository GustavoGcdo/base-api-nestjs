import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { Preference } from '../../models/entities/preference';
export class UpdateUserDto {
  @ApiModelPropertyOptional()
  name?: string;

  @ApiModelPropertyOptional()
  login?: string;

  @ApiModelPropertyOptional()
  email?: string;

  @ApiModelPropertyOptional()
  dataNascimento?: Date;

  @ApiModelPropertyOptional()
  preference?: Preference;

  @ApiModelPropertyOptional()
  isAdmin?: boolean;

  @ApiModelPropertyOptional()
  profile?: string;
}
