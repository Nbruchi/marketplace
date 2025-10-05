import { CurrentUser } from "./current-user.decorator";
import { UserRole } from "../enums/user-enums";

export const CurrentAdmin = () => CurrentUser({ role: UserRole.ADMIN });
