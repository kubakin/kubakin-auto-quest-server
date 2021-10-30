import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateEnterTeamDto } from '../team/dto/create-enter-team.dto';
import { iRequestData } from '../__shared/types/types';
import { Roles } from '../__shared/decorators/roles.decorator';
import { Role } from '../__shared/enums/enums';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Roles([Role.User, Role.Admin])
    @Post('team/enter')
    enterToTeam(@Body() dto: CreateEnterTeamDto, @Request() req: iRequestData) {
        return this.userService.enterToTeamByName(dto, req);
    }

    @Roles([Role.User, Role.Admin])
    @Post('team/leave')
    leaveTeam(@Request() req: iRequestData) {
        return this.userService.leaveTeam(req);
    }

    @Roles([Role.User, Role.Admin])
    @Get('me')
    me(@Request() req: iRequestData) {
        return this.userService.getFullUser(req.user.id);
    }

    @Get('')
    getAll() {
        return this.userService.getAll();
    }
}
