import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentSeller = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user.seller ?? request.user.sellerProfile ?? request.seller;
  },
);
