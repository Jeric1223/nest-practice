import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  @Get('/:id')
  getOne(@Param('id') id: string): Movie {
    return this.moviesService.getOne(id);
  }

  @Post()
  create(@Body() movieData) {
    return this.moviesService.create(movieData);
  }

  @Delete('/:id')
  deleteMovie(@Param('id') movieId: string) {
    return this.moviesService.deleteOne(movieId);
  }

  @Patch('/:id/genre/:genre')
  patchMovie(@Param('id') movieId: string, @Param('genre') genre: string) { return this.moviesService.patchOne(movieId, genre); }
}
