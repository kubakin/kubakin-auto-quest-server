import { Injectable } from '@nestjs/common';
import { Role } from '../__shared/enums/enums';

@Injectable()
export class UserService {
    private readonly users = [
        {
            userId: 1,
            username: 'john',
            password: 'changeme',
            role: Role.Admin
        },
        {
            userId: 2,
            username: 'maria',
            password: 'guess',
            role: Role.User,
        },
    ];
    async findOne(user:string) {
        return this.users.find(item=>item.username === user);
    }
}
