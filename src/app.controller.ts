import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { WorkSpace } from './entities/workspace.entity';
import { Session } from './entities/sessions.entity';

@Controller()
export class AppController {

  constructor(
    private readonly appService: AppService,
  ) {}

  @Get('available/:roomId/:sessionId')
  getAvailableWorkSpaces( @Param('roomId') roomId: number, @Param('sessionId') sessionId: number ): Promise<WorkSpace[]> {
    return this.appService.getAvailableWorkSpaces(roomId, sessionId);
  }

  @Get('occupied/:roomId/:sessionId')
  getOccupiedWorkSpaces( @Param('roomId') roomId: number, @Param('sessionId') sessionId: number ): Promise<WorkSpace[]> {
    return this.appService.getOccupiedWorkSpaces(roomId, sessionId);
  }

  @Get('sessions/most-occupied')
  getSessionsOrderedByMostOccupied(): Promise<Session[]> {
    return this.appService.getSessionsOrderedByMostOccupied();
  }

  @Get('sessions/most-available')
  getSessionsOrderedByMostAvailable(): Promise<Session[]> {
    return this.appService.getSessionsOrderedByMostAvailable();
  }

  @Get('assigned-to-user/:userId')
  getWorkSpacesAssignedToUser( @Param('userId') userId: number ): Promise<WorkSpace[]> {
    return this.appService.getWorkSpacesAssignedToUser(userId);
  }

  @Get('assigned-session/:sessionId')
  getWorkSpacesAssignedToSession( @Param('sessionId') sessionId: number ): Promise<WorkSpace[]> {
    return this.appService.getWorkSpacesAssignedToSession(sessionId);
  }

}
