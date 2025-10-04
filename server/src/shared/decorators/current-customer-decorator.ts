import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentCustomer = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const customer =
      request.user.customer ?? request.user.customerProfile ?? request.customer;

    if (!customer) {
      return null;
    }

    return data ? customer[data as keyof typeof customer] : customer;
  },
);
