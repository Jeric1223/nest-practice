import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';
export declare class MoviesController {
    private readonly moviesService;
    constructor(moviesService: MoviesService);
    getAll(): Movie[];
    getOne(id: number): Movie;
    create(movieData: CreateMovieDto): void;
    deleteMovie(movieId: number): void;
    patch(movieId: number, updateData: UpdateMovieDto): void;
}
