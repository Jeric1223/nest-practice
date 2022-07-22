import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @MinLength(4, {
    message: '뭐해? 4글자 이상이라고',
  })
  @MaxLength(20)
  @IsString()
  //영어랑 숫자만 가능한 유효성 체크
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'password inly accepts english and number',
  })
  password: string;
}
