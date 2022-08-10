import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoogleOauthUserDto } from './dto/google-oauth-user.dto';
import { UserInfo } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserInfo)
    private readonly userInfoRepository: Repository<UserInfo>,
  ) {}

  async googleLogin(user: GoogleOauthUserDto) {
    if (!user) {
      throw new BadRequestException();
    } else {
      const { email, firstName, lastName, picture, accessToken, refreshToken } =
        user;
      const found = await this.userInfoRepository.findOneBy({ email });
      console.log(found);
      if (!found) {
        //새로운 유저이면 데이터베이스에 등록한다.
        const newUser = await this.userInfoRepository.create({
          email,
          username: `${lastName}${firstName}`,
          profile_url: picture,
        });
        await this.userInfoRepository.save(newUser);
      }
      return {
        url: refreshToken
          ? `http://localhost:3000/google/token?accessToken=${accessToken}&refreshToken=${refreshToken}`
          : `http://localhost:3000/google/token?accessToken=${accessToken}`,
      };
    }
  }
}
