import React from 'react';
import { Link } from 'react-router-dom';

type Props = {}

const PlacesPage = (props: Props) => {
    return (
        <div>
            <div className='text-center'>
                <Link className='inline-flex bg-primary gap-1 text-white py-2 px-6 rounded-full' to={'/account/places/new'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>

                    Add new place
                </Link>
            </div>
        </div>
    )
}

export default PlacesPage;