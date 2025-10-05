import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserRole } from "../enums/user-enums";
import { ROLES_KEY } from "../decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly allowAdminBypass = true;

  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<
      UserRole[] | undefined
    >(ROLES_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredRoles || requiredRoles.length === 0) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException("Missing authenticated user in request");
    }

    const userRoles: UserRole[] =
      Array.isArray(user.roles) && user.roles.length
        ? user.roles
        : user.role
          ? [user.role]
          : [];

    if (this.allowAdminBypass && userRoles.includes(UserRole.ADMIN)) {
      return true;
    }

    const hasAnyRequired = requiredRoles.some((role) =>
      userRoles.includes(role),
    );

    if (!hasAnyRequired) {
      throw new ForbiddenException(
        `Required roles: ${requiredRoles.join(", ")}; user roles: ${userRoles.join(", ") || "none"}`,
      );
    }

    return true;
  }
}
