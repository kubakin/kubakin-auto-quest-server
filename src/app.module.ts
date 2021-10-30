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
import * as path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`,
        }),
        AuthModule,
        FileModule,
        GameModule,
        HelpModule,
        TaskModule,
        TeamModule,
        UserModule,
        TypeOrmModule.forRoot({
                'type': 'postgres',
                'host': process.env.POSTGRES_HOST,
                'port': +process.env.POSTGRES_PORT,
                'username': process.env.POSTGRES_USER,
                'password': process.env.POSTGRES_PASSWORD,
                'database': process.env.POSTGRES_DB,
                'entities': ['dist/**/*.entity{.ts,.js}'],
                'synchronize': true,
                ssl: process.env.NODE_ENV === 'production',
                extra: {
                    ssl: {
                        rejectUnauthorized: false,
                    }
                }
            }
        ),
        ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, 'static')}),
    ],
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
