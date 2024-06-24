import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '@app/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ACCESS_TOKEN_KEY } from 'env';

@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      global: true,
      secret: ACCESS_TOKEN_KEY,
      signOptions: {
        issuer: 'HDW',
      },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
