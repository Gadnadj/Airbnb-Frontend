import { createContext, ReactNode, useEffect, useState } from "react";
import { User, UserContextType } from './types';
import axios from "axios";

export const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => { },
    ready: false,
});

type props = {
    children: ReactNode;
}

export const UserContextProvider = ({ children }: props) => {
    const [user, setUser] = useState<User | null>(null);
    const [ready, setReady] = useState<boolean>(false);
    useEffect(() => {
        if (!user) {
            axios.get('/profile').then(({ data }) => {
                setUser(data);
                setReady(true);
            });
        }
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser, ready }}>
            {children}
        </UserContext.Provider>
    )
}