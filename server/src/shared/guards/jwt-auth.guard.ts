import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any) {
    // For protected routes, validate the user
    if (err || !user) {
      throw (
        err ||
        new UnauthorizedException(
          "You must be logged in to perform this action or access this resource"
        )
      );
    }
    
    return user;
  }
}
