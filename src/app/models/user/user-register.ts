import { userRole } from "../../core/enums/user-role";

export interface UserRegister {
    name: string;
    email: string;
    password: string;
    role: userRole;
}