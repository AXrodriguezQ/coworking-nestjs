import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { WorkSpace } from './entities/workspace.entity';
import { Session } from './entities/sessions.entity';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {

  constructor(
    private readonly appService: AppService,
  ) {}

  @ApiParam({
    name:'roomId',
    type:'number',
    required: true,
    description: 'With this parameter you search by the room id',
    examples:{
      example1:{
        value:1
      }
    } 
  })
  @ApiParam({
    name:'sessionId',
    type:'number',
    required: true,
    description: 'With this parameter you search by the session id',
    examples:{
      example1:{
        value:1
      }
    } 
  })
  @ApiOperation({ summary: 'Get available workspaces' })
  @ApiResponse({ status: 200, description: 'Workspaces' })
  @ApiResponse({ status: 404, description: 'Ups... a parameter has not been found'})
  @Get('available/:roomId/:sessionId')
  getAvailableWorkSpaces( @Param('roomId') roomId: number, @Param('sessionId') sessionId: number ): Promise<WorkSpace[]> {
    return this.appService.getAvailableWorkSpaces(roomId, sessionId);
  }

  @ApiParam({
    name:'roomId',
    type:'number',
    required: true,
    description: 'With this parameter you search by the room id',
    examples:{
      example1:{
        value:1
      }
    } 
  })
  @ApiParam({
    name:'sessionId',
    type:'number',
    required: true,
    description: 'With this parameter you search by the session id',
    examples:{
      example1:{
        value:1
      }
    } 
  })
  @ApiOperation({ summary: 'Get ocupied workspaces' })
  @ApiResponse({ status: 200, description: 'Workspaces' })
  @ApiResponse({ status: 404, description: 'Ups... a parameter has not been found'})
  @Get('occupied/:roomId/:sessionId')
  getOccupiedWorkSpaces( @Param('roomId') roomId: number, @Param('sessionId') sessionId: number ): Promise<WorkSpace[]> {
    return this.appService.getOccupiedWorkSpaces(roomId, sessionId);
  }

  @ApiOperation({ summary: 'Get session with the least available sessions' })
  @ApiResponse({ status: 200, description: 'Sessions' })
  @ApiResponse({ status: 404, description: 'Ups... a parameter has not been found'})
  @Get('sessions/most-occupied')
  getSessionsOrderedByMostOccupied(): Promise<Session[]> {
    return this.appService.getSessionsOrderedByMostOccupied();
  }

  @ApiOperation({ summary: 'Get session with most aviable sessions' })
  @ApiResponse({ status: 200, description: 'Sessions' })
  @ApiResponse({ status: 404, description: 'Ups... a parameter has not been found'})
  @Get('sessions/most-available')
  getSessionsOrderedByMostAvailable(): Promise<Session[]> {
    return this.appService.getSessionsOrderedByMostAvailable();
  }

  @ApiParam({
    name:'userId',
    type:'number',
    required: true,
    description: 'With this parameter you search by the user id',
    examples:{
      example1:{
        value:1
      }
    } 
  })
  @ApiOperation({ summary: 'Get WorkSpaces assigned to the user' })
  @ApiResponse({ status: 200, description: 'Workspaces' })
  @ApiResponse({ status: 404, description: 'Ups... a parameter has not been found'})
  @Get('assigned-to-user/:userId')
  getWorkSpacesAssignedToUser( @Param('userId') userId: number ): Promise<WorkSpace[]> {
    return this.appService.getWorkSpacesAssignedToUser(userId);
  }

  @ApiParam({
    name:'sessionId',
    type:'number',
    required: true,
    description: 'With this parameter you search by the session id',
    examples:{
      example1:{
        value:1
      }
    } 
  })
  @ApiOperation({ summary: 'Get WorkSpaces assigned to the session' })
  @ApiResponse({ status: 200, description: 'Workspaces' })
  @ApiResponse({ status: 404, description: 'Ups... a parameter has not been found'})
  @Get('assigned-session/:sessionId')
  getWorkSpacesAssignedToSession( @Param('sessionId') sessionId: number ): Promise<WorkSpace[]> {
    return this.appService.getWorkSpacesAssignedToSession(sessionId);
  }

}
