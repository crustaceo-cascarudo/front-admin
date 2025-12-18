import { userRole } from "../../core/enums/user-role";

export interface User {
    id: number;
    name: string;
    role: userRole;
}
