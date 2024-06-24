import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User as UserModel } from '@app/user/user.entity';

export const User = createParamDecorator(
  (data: keyof UserModel | undefined, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;

    return data ? user[data] : user;
  },
);