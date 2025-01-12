import axios from "axios";
import { useEffect, useState } from "react";
import { Place } from '../types';

type Props = {}

const IndexPage = (props: Props) => {
    const [places, setPlaces] = useState<Place[]>([])
    useEffect(() => {
        axios.get('/places').then(response => {
            setPlaces([...response.data, ...response.data, ...response.data, ...response.data]);
        })
    }, [])


    return (
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
            {places.length > 0 && (
                places.map((place, index) => (
                    <div key={index}>
                        <div className="bg-gray-500 rounded-2xl flex mb-2">
                            {place?.photos[0] && (
                                <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:4000/uploads/' + place?.photos[0]} />
                            )}
                        </div>
                        <h2 className="text-sm truncate leading-4">{place?.title}</h2>
                        <h3 className="font-bold truncate">{place?.address}</h3>
                        <h3 className="font-bold truncate">{place?.price + '$'}</h3>

                    </div>

                ))
            )}
        </div>
    );
};

export default IndexPage;