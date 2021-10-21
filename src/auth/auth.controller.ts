import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Roles } from '../__shared/decorators/roles.decorator';
import { Role } from '../__shared/enums/enums';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }

    @Roles([Role.Admin, Role.User])
    @Get('test')
    test() {
        return 'Hello';
    }

    @Get('test2')
    test2(@Request() req) {
        console.log(req);
        return req.user;
    }
}
