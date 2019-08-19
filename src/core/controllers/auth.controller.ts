import { Body, Controller, HttpException, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../shared/guard/auth.guard';
import { Result } from '../../shared/result/result';
import { AuthService } from '../../shared/services/auth.service';
import { AuthenticateDto } from '../dtos/auth/authenticate.dto';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('Authenticate')
@Controller('v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('')
  async authenticate(@Body() model: AuthenticateDto): Promise<any> {
    const user = await this.authService.authenticate(
      model.login,
      model.password,
    );

    // Caso não encontre o usuário
    if (!user) {
      throw new HttpException(
        new Result('Usuário ou senha inválidos', false, null, null),
        HttpStatus.NOT_FOUND,
      );
    }

    // Gera o token
    const token = await this.authService.createToken(
      user._id,
      user.email,
      null,
    );
    return new Result(null, true, token, null);
  }

  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  async refreshToken(@Req() request): Promise<any> {
    // Gera o token
    const token = await this.authService.createToken(
      request.user.document,
      request.user.email,
      null,
    );
    return new Result(null, true, token, null);
  }
}
