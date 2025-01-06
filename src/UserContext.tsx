import React, { createContext, ReactNode, useState } from "react";
import { User, UserContextType } from './types';

export const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => { },
});

type props = {
    children: ReactNode;
}

export const UserContextProvider = ({ children }: props) => {
    const [user, setUser] = useState<User | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}