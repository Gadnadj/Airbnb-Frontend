import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import { UserContextType } from '../types';
import { Link, Navigate } from 'react-router-dom';

type Props = {};

const Account = (props: Props) => {

    const { user, ready } = useContext<UserContextType>(UserContext);

    if (!ready) {
        return 'Loading...'
    }

    if (ready && !user) return <Navigate to={'/login'} />


    return (
        <div>
            <nav className='w-full flex justify-center mt-8 gap-2'>
                <Link className='py-2 px-6 bg-primary rounded-full text-white' to={'/account'}>
                    My Profile
                </Link>

                <Link className='py-2 px-6 ' to={'/account/bookings'}>
                    My Bookings
                </Link>
                
                <Link className='py-2 px-6 ' to={'/account/places'}>
                    My Accommodations
                </Link>

            </nav>
        </div>
    )


}

export default Account;