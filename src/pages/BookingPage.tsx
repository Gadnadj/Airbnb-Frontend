import React from 'react';
import { useParams } from 'react-router-dom';

type Props = {}

const BookingPage = (props: Props) => {
    const { id } = useParams();
    console.log(id);
    return (
        <div>Single booking: {id}</div>
    )
}

export default BookingPage;