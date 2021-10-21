import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService,
                private jwtService: JwtService) {
    }

    async validateUser({username, password}) {
        const user = this.userService.findOne(username);
        if (user) {
            return user
        }
        return null;
    }

    async login(dto: LoginDto) {
        const user = await this.userService.findOne(dto.username);
        const token = this.jwtService.sign({...dto, role: user.role});
        return token;
    }

    createToken() {

    }
}
