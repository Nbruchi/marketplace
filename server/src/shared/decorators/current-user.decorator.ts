import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export interface CurrentUser {
  id: string;
  sub: string;
  email: string;
  role: string;
  roles: string[];
  [key: string]: unknown;
}

export const CurrentUser = createParamDecorator(
  (data: { role?: string } = {}, ctx: ExecutionContext): CurrentUser => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('No user found in request');
    }

    // Ensure the user object has the expected structure
    const currentUser: CurrentUser = {
      id: user.id || user.sub, // Support both id and sub for backward compatibility
      sub: user.sub || user.id, // Ensure sub is always set
      email: user.email || '',
      role: user.role || '',
      roles: user.roles || [],
      ...user, // Spread the rest of the user properties
    };

    // If a specific role is required, check if user has it
    if (data.role) {
      if (!currentUser.roles || !currentUser.roles.includes(data.role)) {
        throw new UnauthorizedException(`User does not have the required role: ${data.role}`);
      }
    }

    return currentUser;
  },
);
