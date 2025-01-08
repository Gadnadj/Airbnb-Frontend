import React, { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import { UserContextType } from '../types';
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import PlacesPage from './PlacesPage';
import AccountNav from '../AccountNav';

type Props = {};

const ProfilePage = (props: Props) => {

    const [redirect, setRedirect] = useState<string>('');
    const { user, ready, setUser } = useContext<UserContextType>(UserContext);
    let { subpage } = useParams();
    if (subpage === undefined) subpage = 'profile';

    const logout = async (): Promise<void> => {
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
    }

    //-------------------------------------------------------------//
    if (!ready) {
        return 'Loading...'
    }
    if (ready && !user && !redirect) return <Navigate to={'/login'} />
    //-------------------------------------------------------------//

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div>
            <AccountNav />
            {subpage === 'profile' && (
                <div className='text-center max-w-lg mx-auto'>
                    Logged in as {user?.name} ({user?.email})<br />
                    <button onClick={logout} className='primary max-w-sm mt-2'>Logout</button>
                </div>
            )}

            {subpage === 'places' && (
                <PlacesPage />
            )}
        </div>
    )


}

export default ProfilePage;