import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import { UserContextType } from '../types';
import { Navigate } from 'react-router-dom';

type Props = {};

const Account = (props: Props) => {
    
    const { user, ready } = useContext<UserContextType>(UserContext);

    if(!ready) {
        return 'Loading...'
    }

    if (ready && !user) return <Navigate to={'/login'} />
    

    return (
        <div>Account 2 for {user?.name}</div>
    )
    

}

export default Account;