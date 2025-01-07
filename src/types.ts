import { Dispatch, SetStateAction } from "react";

export interface User {
    email: string,
    name: string,
    password: string,
}

export interface UserContextType {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
    ready: boolean;
}