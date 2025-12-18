import { userRole } from "../../core/enums/user-role";

export interface UserRegister {
    name: string;
    password: string;
    role: userRole;
}