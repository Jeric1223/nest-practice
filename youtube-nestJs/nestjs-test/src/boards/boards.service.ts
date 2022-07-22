import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { Repository } from 'typeorm';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  // getAllBoards(): Board[] {
  //   return this.boards;
  // }
  async getAllBoards(): Promise<Board[]> {
    const board = await this.boardRepository.find();
    return board;
  }

  // createBoard(createBoardDto: CreateBoardDto) {
  //   const { title, description } = createBoardDto;
  //   const board: Board = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: BoardStatus.PUBLIC,
  //   };
  //   this.boards.push(board);
  //   return board;
  // }
  async createBoard(createBoardDto: CreateBoardDto) {
    const { title, description } = createBoardDto;

    const board = this.boardRepository.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    await this.boardRepository.save(board);
    return { status: 201, message: 'success createBoard!' };
  }

  // getBoardById(id: string): Board {
  //   const found = this.boards.find((board) => board.id === id);
  //   if (!found) {
  //     throw new NotFoundException(`Can't find Board with id ${id}`);
  //   }
  //   return found;
  // }
  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return found;
  }
  // deleteBoard(id: string): void {
  //   const found = this.getBoardById(id);
  //   this.boards = this.boards.filter((board) => board.id !== found.id);
  // }
  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id); //바로 삭제 됨
    if (result.affected === 0) {
      throw new NotFoundException(`Cant find Board with id ${id}`);
    }
  }
  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }
  async updateBoardStatus(
    id: number,
    status: BoardStatus,
    updateData: UpdateBoardDto,
  ): Promise<Board> {
    const { title, description } = updateData;
    const board = await this.getBoardById(id);

    console.log(title, status, description);

    if (status) board.status = status;
    if (title) board.title = title;
    if (description) board.description = description;

    await this.boardRepository.save(board);

    return board;
  }
}
