import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Perks from '../Perks';
import axios from 'axios';

type Props = {}

const PlacesPage = (props: Props) => {
    const { action } = useParams();
    const [title, setTitle] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [addedPhotos, setAddedPhotos] = useState<string[]>([]);
    const [photoLink, setPhotoLink] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [perks, setPerks] = useState<string[]>([]);
    const [extraInfo, setExtraInfo] = useState<string>('');
    const [checkIn, setCheckIn] = useState<string>('');
    const [checkOut, setCheckOut] = useState<string>('');
    const [maxGuests, setMaxGuests] = useState<number>(1);

    const inputHeader = (text: string): JSX.Element => {
        return (
            <h2 className='text-2xl mt-4' >{text}</h2>
        )
    }

    const inputDescription = (text: string): JSX.Element => {
        return (
            <p className='text-gray-500 text-sm'>{text}</p>
        )
    }

    const h3Description = (text: string): JSX.Element => {
        return (
            <h3 className='mt-2 -mb-1'>{text}</h3>

        )
    }

    const preInput = (header: string, description: string): JSX.Element => {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        );
    }

    const uploadPhotos = async (e: React.FormEvent) => {
        const files = (e.target as HTMLInputElement).files;
        const data = new FormData();
        for (let i = 0; i < files!?.length; i++) {
            data.append('photos', files![i]);
        }

        const response = await axios.post('/upload', data, {
            headers: { 'Content-type': 'multipart/form-data' }
        })
        setAddedPhotos(prev => {
            return [...prev, response.data]
        });
    }

    const addPhotoByLink = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        const { data: filename } = await axios.post('/upload-by-link', { link: photoLink })
        setAddedPhotos(prev => {
            return [...prev, filename]
        });
        setPhotoLink('');
    }

    return (
        <div>
            <div className='text-center'>
                {action != 'new' && (
                    <Link className='inline-flex bg-primary gap-1 text-white py-2 px-6 rounded-full' to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add new place
                    </Link>
                )}
            </div>
            {action === 'new' && (
                <div>
                    <form>
                        {preInput('Title', 'title for your place, should be short and catchy')}
                        <input type="text" placeholder='title, for example: My lovely appartment' value={title} onChange={(e) => { setTitle(e.target.value) }} />

                        {preInput('Address', 'Address to this place')}
                        <input type="text" placeholder='address' value={address} onChange={(e) => { setAddress(e.target.value) }} />

                        {preInput('Photos', 'more = better')}
                        <div className='flex gap-2'>
                            <input type="text" placeholder={'Add using link ....jpg'} value={photoLink} onChange={(e) => { setPhotoLink(e.target.value) }} />
                            <button onClick={(e) => addPhotoByLink(e)} className='bg-gray-200 px-4 rounded-2xl'>Add&nbsp;Photo</button>
                        </div>

                        <div className='mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>

                            {addedPhotos.length > 0 && addedPhotos.map((link, index) => (
                                <div key={index} >
                                    <img src={'http://localhost:4000/uploads/' + link} className='rounded-2xl' />
                                </div>
                            ))}
                            <label className=' flex items-center justify-center gap-1 border bg-transparent rounded-2xl p-2 text-2xl text-gray-600 cursor-pointer'>
                                <input type="file" className='hidden' multiple onChange={uploadPhotos} />

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                                </svg>
                                Upload
                            </label>
                        </div>

                        <h2 className='text-2xl mt-4' >Description</h2>
                        <p className='text-gray-500 text-sm'>Description of the place</p>

                        <textarea value={description} onChange={(e) => { setDescription(e.target.value) }} />

                        <h2 className='text-2xl mt-4' >Perks</h2>
                        <p className='text-gray-500 text-sm'>Select all the perks of your place</p>

                        <div className='grid grid-cols-2 md:grid-col-3 lg:grid-cols-6 gap-2 mt-2'>
                            <Perks selected={perks} onChange={setPerks} />
                        </div>

                        {preInput('Extra Info', 'House rules, etc...')}

                        <textarea value={extraInfo} onChange={(e) => { setExtraInfo(e.target.value) }} />

                        {preInput('Check in&out times', 'add check in and out time, remember to have some time window for cleaning the room between guests')}
                        <div className='grid sm:grid-cols-3 gap-2'>
                            <div>
                                {h3Description('Check in time')}
                                <input type="text" placeholder='14:00' value={checkIn} onChange={(e) => { setCheckIn(e.target.value) }} />
                            </div>

                            <div>
                                {h3Description('Check out time')}
                                <input type="text" placeholder='11:00' value={checkOut} onChange={(e) => { setCheckOut(e.target.value) }} />
                            </div>

                            <div>
                                {h3Description('Max number of guests')}
                                <input type="number" placeholder='2' value={maxGuests} onChange={(e) => { setMaxGuests(Number(e.target.value)) }} />
                            </div>
                        </div>

                        <button className='primary my-4'>Save</button>

                    </form>
                </div>
            )}

        </div>

    )
}

export default PlacesPage;