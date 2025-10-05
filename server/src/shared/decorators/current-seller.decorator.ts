import { CurrentUser } from "./current-user.decorator";
import { UserRole } from "../enums/user-enums";

export const CurrentSeller = () => CurrentUser({ role: UserRole.SELLER });
