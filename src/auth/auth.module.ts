import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import JwtStrategy from './passport/strategy.jwt';


@Module({
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    imports: [
        forwardRef(() => UserModule),
        PassportModule,
        JwtModule.register({
            secret: 'secret',
            signOptions: {expiresIn: '10h'},
        }),]
})
export class AuthModule {
}
