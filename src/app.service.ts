import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkSpace } from './entities/workspace.entity';
import { Repository } from 'typeorm';
import { Session } from './entities/sessions.entity';

@Injectable()
export class AppService {
  
    constructor(
        @InjectRepository(WorkSpace) private readonly workSpaceRepository: Repository<WorkSpace>,
        @InjectRepository(Session) private readonly sessionRepository: Repository<Session>,
      ) {}
    
      async getAvailableWorkSpaces( roomId: number, sessionId: number ): Promise<WorkSpace[]> {
        try {

            const query = await this.workSpaceRepository
                .createQueryBuilder('workSpace')
                .leftJoinAndSelect('workSpace.bookings', 'booking', 'booking.id_session = :sessionId', { sessionId })
                .where('workSpace.room.id = :roomId', { roomId })
                .andWhere('booking.id IS NULL')
                .getMany();

            if ( !query ) throw new HttpException('Invalid query', HttpStatus.BAD_REQUEST)

            return query
            
        } catch (err) {
            throw new HttpException(`Ups... ${err}`, HttpStatus.INTERNAL_SERVER_ERROR)
        }
      }
    
      async getOccupiedWorkSpaces( roomId: number, sessionId: number ): Promise<WorkSpace[]> {
        try {
            
            const query = await this.workSpaceRepository
                .createQueryBuilder('workSpace')
                .innerJoin('workSpace.bookings', 'booking', 'booking.id_session = :sessionId', { sessionId })
                .where('workSpace.room.id = :roomId', { roomId })
                .getMany();

            if ( !query ) throw new HttpException('Invalid query', HttpStatus.BAD_REQUEST)

            return query;

        } catch (err) {
            throw new HttpException(`Ups... ${err}`, HttpStatus.INTERNAL_SERVER_ERROR)
        }
      }
    
      async getSessionsOrderedByMostOccupied(): Promise<Session[]> {
        try {
        
            const query = await this.sessionRepository
                .createQueryBuilder('session')
                .leftJoin('session.bookings', 'booking')
                .groupBy('session.id')
                .orderBy('COUNT(booking.id)', 'DESC')
                .getMany();
        
            if ( !query ) throw new HttpException('Invalid query', HttpStatus.BAD_REQUEST)

            return query

        } catch (err) {
            throw new HttpException(`Ups... ${err}`, HttpStatus.INTERNAL_SERVER_ERROR)
        }
      }
    
      async getSessionsOrderedByMostAvailable(): Promise<Session[]> {
        try {

            const query = await this.sessionRepository
                .createQueryBuilder('session')
                .leftJoin('session.bookings', 'booking')
                .groupBy('session.id')
                .orderBy('COUNT(booking.id)', 'ASC')
                .getMany();

            if ( !query ) throw new HttpException('Invalid query', HttpStatus.BAD_REQUEST)

            return query
            
        } catch (err) {
            throw new HttpException(`Ups... ${err}`, HttpStatus.INTERNAL_SERVER_ERROR)
        }
      }
    
      async getWorkSpacesAssignedToUser( userId: number ): Promise<WorkSpace[]> {
        try {
         
            const query = await this.workSpaceRepository
                .createQueryBuilder('workSpace')
                .innerJoin('workSpace.bookings', 'booking', 'booking.cc_user = :userId', { userId })
                .getMany();

            if ( !query ) throw new HttpException('Invalid query', HttpStatus.BAD_REQUEST)

            return query
            
        } catch (err) {
            throw new HttpException(`Ups... ${err}`, HttpStatus.INTERNAL_SERVER_ERROR)
        }
      }
    
      async getWorkSpacesAssignedToSession(sessionId: number): Promise<WorkSpace[]> {
        try {
         
            const query = await this.workSpaceRepository
                .createQueryBuilder('workSpace')
                .innerJoin('workSpace.bookings', 'booking', 'booking.id_session = :sessionId', { sessionId })
                .getMany();

            if ( !query ) throw new HttpException('Invalid query', HttpStatus.BAD_REQUEST)

            return query
            
        } catch (err) {
            throw new HttpException(`Ups... ${err}`, HttpStatus.INTERNAL_SERVER_ERROR)
        }
      }

}
