import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Help } from './help.entity';
import { Repository } from 'typeorm';
import { TaskService } from '../task/task.service';
import { User } from '../user/user.entity';
import { CreateHelpDto } from './dto/create-help.dto';
import { firstDateBigger } from '../__shared/helpers/helpers';

@Injectable()
export class HelpService {
    constructor(@InjectRepository(Help) private readonly helpRepository: Repository<Help>,
                private readonly taskService: TaskService) {
    }
    async getHelp(user: User) {

        const task = await this.taskService.getCurrentTaskUser(user);
        const helps = await this.helpRepository.find({task: task.task});
        if (task.help_status >= helps.length - 1) {
            throw new HttpException('Подсказки закончились!', HttpStatus.NOT_FOUND);
        }
        if (firstDateBigger(task.next_help)) {
            throw new HttpException('Подсказка еще не доступна!', HttpStatus.NOT_FOUND);
        }
        await this.taskService.updateHelpStatus(task);
        return helps[task.help_status];
    }

    async create(dto: CreateHelpDto) {
        const task = await this.taskService.getTaskById(dto.task_id);
        const help = await this.helpRepository.save({task, text: dto.text});
        return help;
    }

    async delete(id: number) {
        return await this.helpRepository.delete(id);
    }
}
