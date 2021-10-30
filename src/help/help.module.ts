import { Module } from '@nestjs/common';
import { HelpController } from './help.controller';
import { HelpService } from './help.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Help } from './help.entity';
import { TaskModule } from '../task/task.module';

@Module({
  controllers: [HelpController],
  providers: [HelpService],
  imports: [TypeOrmModule.forFeature([Help]), TaskModule]
})
export class HelpModule {}
