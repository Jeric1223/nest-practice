import { IsString } from 'class-validator';

export class GoogleOauthUserDto {
  @IsString()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  picture: string;

  @IsString()
  accessToken: string;

  @IsString()
  refreshToken: string;
}
