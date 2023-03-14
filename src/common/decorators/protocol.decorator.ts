import { createParamDecorator } from '@nestjs/common/decorators';
import { ExecutionContext } from '@nestjs/common/interfaces';

export const Protocol = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    console.log(data);
    const req = ctx.switchToHttp().getRequest();

    return req.protocol;
  },
);
