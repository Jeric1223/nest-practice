import { IsNotEmpty, IsString } from 'class-validator';
import { BoardStatus } from '../board-status.enum';

export class UpdateBoardDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
