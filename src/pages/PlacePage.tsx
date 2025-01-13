import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Place } from "../types";
import BookingWidget from "../BookingWidget";

type Props = {}

const PlacePage = (props: Props) => {
    const { id } = useParams();
    const [place, setPlace] = useState<Place>();
    const [showAllPhotos, setShowAllPhotos] = useState<boolean>(false);

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/places/${id}`).then((response) => {
            setPlace(response.data);
        })
    }, [id]);

    if (!place) return '';

    if (showAllPhotos) {
        return (
            <div className="absolute inset-0 bg-black min-h-screen text-white">
                <div className="bg-black p-8 grid gap-4">
                    <div>
                        <h2 className="sm:text-3xl">Photos of {place.title}</h2>
                        <button onClick={() => setShowAllPhotos(false)} className="fixed flex items-center gap-1 py-2 px-4 rounded-2xl text-black bg-gray-200 shadow-lg shadow-gray-400 text-lg right-12 top-8">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                            </svg>
                            Close Photos
                        </button>
                    </div>
                    {place.photos.map(photo => (
                        <div>
                            <img className="sm:h-[400px] w-full md:h-[600px] object-cover" src={'http://localhost:4000/uploads/' + photo} alt="" />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="mt-4 bg-gray-100 px-8 py-8 md:-mx-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl">{place?.title}</h1>
                <a className='my-2 underline font-semibold text-sm flex items-center gap-1 my-3' target="_blank" href={'https://maps.google.com/?q=' + place?.address}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
                    </svg>
                    {place?.address}</a>
                <div className="relative">
                    <div className="grid gap-2 grid-cols-1 md:grid-cols-[2fr_1fr] rounded-3xl overflow-hidden h-[400px] md:h-[500px]">
                        <div className="overflow-hidden">
                            {place.photos?.[0] && (
                                <div className="h-full">
                                    <img
                                        className='w-full h-full object-cover aspect-square md:aspect-auto'
                                        src={'http://localhost:4000/uploads/' + place.photos[0]}
                                    />
                                </div>
                            )}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-1 md:grid-rows-2 gap-2 overflow-hidden">
                            <div className="overflow-hidden">
                                {place.photos?.[1] && (
                                    <div className="h-full">
                                        <img
                                            className="w-full h-full object-cover"
                                            src={'http://localhost:4000/uploads/' + place.photos[1]}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="overflow-hidden">
                                {place.photos?.[2] && (
                                    <div className="h-full">
                                        <img
                                            className="w-full h-full object-cover"
                                            src={'http://localhost:4000/uploads/' + place.photos[2]}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {place?.photos?.length > 3 && (
                        <button onClick={() => setShowAllPhotos(true)} className="absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-xl shadow-gray-500 flex gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />
                            </svg>
                            Show more photos
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] mt-8 gap-8">
                <div>
                    <div className="mb-2">
                        <h2 className="font-semibold text-2xl ">Description</h2>
                        {place?.description}<br />
                    </div>
                    <div className="mb-2">
                        <span className="font-bold">Check-in: </span>{place.checkIn}<br />
                    </div>
                    <div className="mb-2">
                        <span className="font-bold">Check-out: </span>{place.checkOut}<br />
                    </div>
                    <div className="mb-3">
                        <span className="font-bold">Max Guests: </span>{place.maxGuests}<br />
                    </div>
                    {place.extraInfo && (
                        <div className="text-sm text-gray-700  leading-2 gap-1">
                            <span className="text-black text-[16px] font-bold ">Extras Infos: </span>{place.extraInfo}
                        </div>
                    )}
                </div>
                <BookingWidget place={place} />
            </div>

        </div>
    )
}

export default PlacePage;