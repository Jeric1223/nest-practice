import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(authCredentialsDto: AuthCredentialsDto) {
    const { username, password } = authCredentialsDto;
    const user = this.userRepository.create({ username, password });

    try {
      await this.userRepository.save(user);
      return { status: 201, message: 'success signUp!' };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(
          `아이디 ${username}은(는) 이미 사용중입니다. 다른 아이디를 입력해 주세요.`,
        );
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
