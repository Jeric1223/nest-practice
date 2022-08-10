import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { typeORMConfig } from './configs/typeorm.config';

@Module({
  imports: [AuthModule, TypeOrmModule.forRoot(typeORMConfig)],
})
export class AppModule {}
