import React, { useEffect, useState } from 'react';
import AccountNav from '../AccountNav';
import axios from 'axios';
import { Booking } from '../types';
import PlaceImg from '../PlaceImg';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

type Props = {}

const BookingsPage = () => {
    const [bookings, setBookings] = useState<Booking[]>([])
    useEffect(() => {
        axios.get('/bookings').then(response => {
            setBookings(response.data)
        })
    }, [])
    return (
        <div>
            <AccountNav />
            <div>
                {bookings?.length > 0 && bookings.map((booking, index) => (
                    <Link to={`/account/bookings/${booking._id}`} key={index} className='flex gap-4 bg-gray-200 rounded-2xl overflow-hidden'>
                        <div className='w-48'>
                            <img
                                className="object-cover w-full h-full rounded-xl "
                                src={'http://localhost:4000/uploads/' + booking.place.photos[index]}
                                alt="Place preview"
                            />
                        </div>
                        <div className='py-3 pr-3 grow'>
                            <h2 className='text-lg md:text-2xl font-bold'>{booking.place.title}</h2>
                            <div className='flex gap-1 border-t border-gray-300 mt-2 py-2 text-md md:text-xl'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                </svg>
                                {format(new Date(booking.checkIn.toString()), 'dd-MM-yyyy')}
                                &rarr;
                                {format(new Date(booking.checkOut.toString()), 'dd-MM-yyyy')}
                            </div>

                            <div className='truncate text-md md:text-xl gap-1'>
                                <div className='flex gap-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                                    </svg>
                                    {booking.numOfNights} nights <br />
                                </div>
                                <div className='flex gap-1 mt-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    Total price: ${booking.price}
                                </div>

                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default BookingsPage;