import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Booking } from '../types';
import axios from 'axios';

const BookingPage = () => {
    const { id } = useParams();
    const [booking, setBooking] = useState<Booking | null>(null)

    useEffect(() => {
        if (id) {
            axios.get('/bookings').then(response => {
                const foundBooking = response.data.find(({ _id }: any) => _id === id);
                setBooking(foundBooking);
            })
        }
    }, [id])

    if (booking) {
        return <Navigate to={`/places/${booking.place._id}`} />
    }

    return (
        <div>
            
        </div>
    )
}

export default BookingPage;