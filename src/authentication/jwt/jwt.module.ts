import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule } from 'nestjs-config';

@Module({
  imports: [
    ConfigModule,
    NestJwtModule.registerAsync({
      useFactory: (): JwtModuleOptions => {
        return {
          secret: process.env.JWT_SECRET,
        };
      },
    }),
  ],
  exports: [NestJwtModule],
})
export class JwtModule {}
