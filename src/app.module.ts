import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { GameModule } from './game/game.module';
import { HelpModule } from './help/help.module';
import { TaskModule } from './task/task.module';
import { TeamModule } from './team/team.module';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './__shared/guards/jwt.guard';
import { RolesGuard } from './__shared/guards/roles.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { getConnectionOptions } from 'typeorm';

@Module({
    imports: [
        AuthModule,
        FileModule,
        GameModule,
        HelpModule,
        TaskModule,
        TeamModule,
        UserModule,
        TypeOrmModule.forRootAsync({
            useFactory: async () =>
                Object.assign(await getConnectionOptions(), {
                    autoLoadEntities: true,
                }),
        })],
    controllers: [AppController],
    providers: [AppService
        , {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        }],
})
export class AppModule {
    constructor(private connection: Connection) {
    }

}
