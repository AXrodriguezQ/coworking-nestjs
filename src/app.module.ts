import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config/config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './entities/sessions.entity';
import { Booking } from './entities/booking.entity';
import { WorkSpace } from './entities/workspace.entity';
import { Room } from './entities/rooms.entity';
import { User } from './entities/users.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forFeature([
      WorkSpace, 
      Booking, 
      Session
    ]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config().database.host,
      port: config().database.port,
      username: config().database.username,
      password: config().database.password,
      database: config().database.db,
      entities: [User, Session, Room, WorkSpace, Booking],
      autoLoadEntities: true,
      synchronize: false,
      ssl: {
        rejectUnauthorized: false
      },
      logging: true,
      extra: {
        max: 10, 
        idleTimeoutMillis: 30000, 
        connectionTimeoutMillis: 2000, 
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}