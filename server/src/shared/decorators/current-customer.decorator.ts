import { CurrentUser } from "./current-user.decorator";
import { UserRole } from "../enums/user-enums";

export const CurrentCustomer = () => CurrentUser({ role: UserRole.CUSTOMER });
