import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'this will return all movies';
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return `this will return one movie with the id: ${id}`;
  }

  @Post()
  create() {
    return 'This will create a new movie';
  }

  @Delete('/:id')
  deleteMovie(@Param('id') movieId: string) {
    return `this will delete a movie with the movie: ${movieId}`;
  }

  @Patch('/:id')
  patchMovie(@Param('id') movieId: string) {
    return `this will patch a movie with the movie: ${movieId}`;
  }
}
