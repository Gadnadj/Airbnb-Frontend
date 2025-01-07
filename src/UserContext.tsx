import { createContext, ReactNode, useEffect, useState } from "react";
import { User, UserContextType } from './types';
import axios from "axios";

export const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => { },
});

type props = {
    children: ReactNode;
}

export const UserContextProvider = ({ children }: props) => {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        if (!user) {
            axios.get('/profile').then(({ data }) => {
                setUser(data);
            });
        }
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}