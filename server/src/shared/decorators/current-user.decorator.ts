import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";

export const CurrentUser = createParamDecorator(
  (data: { role?: string } = {}, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException("No user found in request");
    }

    // If no specific role is required, return the user as is
    if (!data.role) {
      return user;
    }

    // Check if the user has the required role
    if (user.role !== data.role) {
      throw new UnauthorizedException(`User must have role: ${data.role}`);
    }

    return user;
  },
);
