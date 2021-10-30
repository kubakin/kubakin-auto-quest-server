import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateEnterTeamDto } from './dto/create-enter-team.dto';
import { Roles } from '../__shared/decorators/roles.decorator';
import { Role } from '../__shared/enums/enums';
import { iRequestData } from '../__shared/types/types';

@Controller('team')
export class TeamController {
    constructor(private teamService: TeamService) {
    }


    // @Roles([Role.User, Role.Admin])
    @Post('')
    create(@Body() dto: CreateEnterTeamDto, @Request() req: iRequestData) {
        return this.teamService.create(dto, req);
    }


    // @Roles([Role.Admin])
    @Get('')
    findAll() {
        return this.teamService.findAll();
    }

    @Roles([Role.Admin])
    @Get(':id')
    getTeam(@Param('id') id: number) {
        return this.teamService.getTeamByPk(id);
    }

    @Post('activate/:id')
    activateTeam(@Param('id') id: number) {
        return this.teamService.activateTeam(id);
    }



}
