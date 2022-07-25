import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BaordStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  private logger = new Logger('BoardsController');
  constructor(private boardsService: BoardsService) {}

  // @Get()
  // getAllBoard(): Board[] {
  //   return this.boardsService.getAllBoards();
  // }
  @Get()
  getAllBoard(@Req() req): Promise<Board[]> {
    this.logger.verbose(`User ${req.user.username} trying to get all boards`);
    return this.boardsService.getAllBoards(req.user);
  }

  // @Post()
  // @UsePipes(ValidationPipe)
  // createBoard(@Body() createBoardDto: CreateBoardDto): Board {
  //   return this.boardsService.createBoard(createBoardDto);
  // }
  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto, @Req() req) {
    this.logger.verbose(
      `User ${
        req.user.username
      } creating a new board. Payload: ${JSON.stringify(createBoardDto)}`,
    );
    return this.boardsService.createBoard(createBoardDto, req.user);
  }

  // @Get(':id')
  // getBoardById(@Param('id') id: string): Board {
  //   return this.boardsService.getBoardById(id);
  // }

  @Get(':id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  // @Delete(':id')
  // deleteBoard(@Param('id') id: string): void {
  //   return this.boardsService.deleteBoard(id);
  // }
  @Delete(':id')
  deleteBoard(@Param('id', ParseIntPipe) id, @Req() req): Promise<void> {
    return this.boardsService.deleteBoard(id, req.user);
  }

  // @Patch(':id/status')
  // updateBoardStatus(
  //   @Param('id') id: string,
  //   @Body('status', BaordStatusValidationPipe) status: BoardStatus,
  // ): Board {
  //   return this.boardsService.updateBoardStatus(id, status);
  // }
  @Patch(':id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BaordStatusValidationPipe)
    status: BoardStatus,
    @Body()
    updateData: UpdateBoardDto,
  ): Promise<Board> {
    return this.boardsService.updateBoardStatus(id, status, updateData);
  }
}
