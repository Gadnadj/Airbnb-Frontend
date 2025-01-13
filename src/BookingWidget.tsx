import { Place } from './types';

type Props = {
    place: Place;
}

const BookingWidget = ({ place }: Props) => {
    return (
        <div>
            <div className="mt-4 md:mt-2 bg-white shadow-lg p-4 rounded-2xl">
                <div className="text-md md:text-2xl text-center mb-2">
                    <span className="text-md md:text-lg font-bold">Price: ${place.price} / per night</span>
                </div>
                <div className="border rounded-2xl mb-4">
                    <div className="md:flex">
                        <div className="text-sm md:text-lg py-4 px-2">
                            <label className="font-bold text-sm md:text-lg">Check in: </label>
                            <input className="text-sm md:text-lg" type="date" />
                        </div>
                        <div className="text-sm md:text-lg py-4 px-2 border-l">
                            <label className="font-bold text-sm md:text-lg">Check Out: </label>
                            <input className="text-sm md:text-lg" type="date" />
                        </div>
                    </div>
                    <div className="text-sm md:text-lg py-4 px-2 border-t">
                        <label className="font-bold text-sm md:text-lg">N. of guests: </label>
                        <input className="text-sm md:text-lg" type="number" value={1} />
                    </div>
                </div>

                <button className="primary text-sm md:text-md">Book this place</button>
            </div>
        </div>
    )
}

export default BookingWidget;