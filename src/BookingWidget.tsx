import { useState } from 'react';
import { Place, Booking } from './types';
import { differenceInCalendarDays } from 'date-fns';
import axios from 'axios';

type Props = {
    place: Place;
}

const BookingWidget = ({ place }: Props) => {
    const [checkIn, setCheckIn] = useState<Date>();
    const [checkOut, setCheckOut] = useState<Date>();
    const [numOfGuests, setNumOfGuests] = useState<number>(1);
    const [nameGuest, setNameGuest] = useState<string>('');
    const [mobile, setMobile] = useState<string>('');
    const [redirect, setRedirect] = useState<string>('');

    let numberOfDays = 0;
    let calculatePrice = place.price;
    if (checkIn && checkOut) {
        numberOfDays = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
        calculatePrice = numberOfDays * place.price
    }

    const bookingData: Booking | null = checkIn && checkOut ? {
        place: place._id,
        checkIn,
        checkOut,
        name: nameGuest,
        phone: mobile,
        price: calculatePrice,
        numOfNights: numberOfDays
    } : null;

    const sendBooking = async () => {
        const response = await axios.post('/booking', { ...bookingData });
        const bookingId = response.data._id;
        setRedirect(`/account/bookings/${bookingId}`);
    }

    return (
        <div>
            <div className="mt-4 md:mt-2 bg-white shadow-2xl shadow-gray-700 p-4 rounded-2xl">
                <div className="text-md md:text-2xl text-center mb-2">
                    {numberOfDays > 0 && (
                        <span className="text-md md:text-lg font-bold">Price: ${calculatePrice} / {numberOfDays} night(s)</span>
                    )}

                    {numberOfDays <= 0 && (
                        <span className="text-md md:text-lg font-bold">Price: ${place.price} / per night</span>
                    )}
                </div>
                <div className="border rounded-2xl mb-4">
                    <div className="md:flex">
                        <div className="text-sm md:text-lg py-4 px-2">
                            <label className="font-bold text-sm md:text-lg">Check in: </label>
                            <input className="text-sm md:text-lg" type="date" value={checkIn ? checkIn.toISOString().split('T')[0] : ''} onChange={(e) => setCheckIn(e.target.value ? new Date(e.target.value) : undefined)} />
                        </div>
                        <div className="text-sm md:text-lg py-4 px-2 border-l">
                            <label className="font-bold text-sm md:text-lg">Check Out: </label>
                            <input className="text-sm md:text-lg" type="date" value={checkOut ? checkOut.toISOString().split('T')[0] : ''} onChange={(e) => setCheckOut(e.target.value ? new Date(e.target.value) : undefined)} />
                        </div>
                    </div>
                    <div className="text-sm md:text-lg py-4 px-2 border-t">
                        <label className="font-bold text-sm md:text-lg">N. of guests:  </label>
                        <input className="text-sm md:text-lg" type="number" value={numOfGuests} onChange={(e) => setNumOfGuests(Number(e.target.value))} />
                    </div>

                    {numberOfDays > 0 && (
                        <div>
                            <div className="text-sm md:text-lg py-4 px-2 border-t">
                                <label className="font-bold text-sm md:text-lg">Name:  </label>
                                <input className="text-sm md:text-lg" type="text" placeholder='John Doe' value={nameGuest} onChange={(e) => setNameGuest(e.target.value)} />
                            </div>
                            <div className="text-sm md:text-lg py-4 px-2 border-t">
                                <label className="font-bold text-sm md:text-lg">Phone Number:  </label>
                                <input className="text-sm md:text-lg" type="tel" placeholder='0586304523' value={mobile} onChange={(e) => setMobile(e.target.value)} />
                            </div>
                        </div>

                    )}

                </div>

                {numberOfDays >= 0 && numOfGuests <= place.maxGuests && mobile.length === 10 && nameGuest.length > 1 && (
                    <button onClick={() => sendBooking()} className="primary text-sm md:text-md">
                        Book this place
                    </button>
                )}
            </div>
        </div>
    )
}

export default BookingWidget;