import axios from "axios";
import { useEffect, useState } from "react";
import { Place } from '../types';
import { Link } from "react-router-dom";

const IndexPage = () => {
    const [places, setPlaces] = useState<Place[]>([])
    useEffect(() => {
        axios.get('/places').then(response => {
            setPlaces([...response.data]);
        })
    }, [])


    return (
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-8">
            {places.length > 0 && (
                places.map((place, index) => (
                    <Link to={'/places/' + place._id} key={index}>
                        <div className="bg-gray-500 rounded-2xl flex mb-2 shadow-2xl shadow-gray-400">
                            {place?.photos[0] && (
                                <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:4000/uploads/' + place?.photos[0]} />
                            )}
                        </div>
                        <h2 className="font-bold ">{place?.address}</h2>
                        <h3 className="text-sm text-gray-500 truncate">{place?.title}</h3>
                        <div className="mt-1">
                            <span className="font-bold">${place?.price}</span> per night
                        </div>
                    </Link>

                ))
            )}
        </div>
    );
};

export default IndexPage;