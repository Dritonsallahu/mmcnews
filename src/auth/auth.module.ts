import { Module } from '@nestjs/common'; 
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt-strategy';
import { AuthController } from './mobile/controllers/auth/auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user';
import { AuthService } from './mobile/services/auth/auth.service';
import { Reader, ReaderSchema } from 'src/schemas/reader';

@Module({ 
  imports: [ 
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }, 
      { name: Reader.name, schema: ReaderSchema }, 
    ]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy,JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
 