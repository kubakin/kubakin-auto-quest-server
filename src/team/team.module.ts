import { forwardRef, Module } from '@nestjs/common';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './team.entity';
import { UserModule } from '../user/user.module';
import { TaskModule } from '../task/task.module';

@Module({
  controllers: [TeamController],
  providers: [TeamService],
  imports: [TypeOrmModule.forFeature([Team]), forwardRef(()=>UserModule), TaskModule],
  exports: [TeamService]
})
export class TeamModule {}
