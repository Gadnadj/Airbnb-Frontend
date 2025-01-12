import axios from 'axios';
import React, { FormEvent, useEffect, useState } from 'react';
import Perks from '../Perks';
import AccountNav from '../AccountNav';
import { Navigate, useParams } from 'react-router-dom';

const PlacesFormPage = () => {
  const { id } = useParams();
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
  const [redirect, setRedirect] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;
    axios.get('/places/' + id).then(response => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
    });
  }, [id])

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

    const responses = await axios.post('/upload', data, {
      headers: { 'Content-type': 'multipart/form-data' }
    })
    setAddedPhotos(prev => {
      return [...prev, ...responses.data]
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

  const removePhoto = (e: FormEvent, link: string) => {
    e.preventDefault();
    setAddedPhotos(addedPhotos.filter(photo => photo !== link));
  }

  const selectAsMainPhoto = (e: FormEvent, link: string) => {
    e.preventDefault();
    const addedPhotosWithoutSelected: string[] = addedPhotos.filter(photo => photo != link);
    const newAddedPhotos = [link, ...addedPhotosWithoutSelected];
    setAddedPhotos(newAddedPhotos);
  }

  const savePlace = async (e: React.FormEvent) => {
    e.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    }
    //update place
    if (id) {
      await axios.put('/places', { id, ...placeData });
      setRedirect(true);
    }

    else {
      //new place
      await axios.post('/places', { placeData });
      setRedirect(true);
    }
  }

  if (redirect) return <Navigate to={'/account/places'} />

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
        {preInput('Title', 'title for your place, should be short and catchy')}
        <input
          type='text'
          placeholder='title, for example: My lovely appartment'
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        {preInput('Address', 'Address to this place')}
        <input
          type='text'
          placeholder='address'
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />

        {preInput('Photos', 'more = better')}
        <div className='flex gap-2'>
          <input
            type='text'
            placeholder={'Add using link ....jpg'}
            value={photoLink}
            onChange={(e) => {
              setPhotoLink(e.target.value);
            }}
          />
          <button
            onClick={(e) => addPhotoByLink(e)}
            className='bg-gray-200 px-4 rounded-2xl'
          >
            Add&nbsp;Photo
          </button>
        </div>

        <div className='mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
          {addedPhotos.length > 0 &&
            addedPhotos.map((link) => (
              <div key={link} className='h-32 flex relative'>
                <img
                  src={'http://localhost:4000/uploads/' + link}
                  className='rounded-2xl w-full object-cover'
                />
                <button onClick={(e) => removePhoto(e, link)} className='cursor-pointer absolute bottom-1 right-1 text-white bg-black bg-opacity-50 p-2 rounded-2xl py-2 px-3'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
                <button onClick={(e) => selectAsMainPhoto(e, link)} className='cursor-pointer absolute bottom-1 left-1 text-white bg-black bg-opacity-50 p-2 rounded-2xl py-2 px-3'>
                  {link === addedPhotos[0] && (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                    </svg>
                  )}
                  {link !== addedPhotos[0] && (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                    </svg>
                  )}
                </button>
              </div>
            ))}
          <label className='h-32 flex items-center justify-center gap-1 border bg-transparent rounded-2xl p-2 text-2xl text-gray-600 cursor-pointer'>
            <input
              type='file'
              className='hidden'
              multiple
              onChange={uploadPhotos}
            />
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-8'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z'
              />
            </svg>
            Upload
          </label>
        </div>

        <h2 className='text-2xl mt-4'>Description</h2>
        <p className='text-gray-500 text-sm'>Description of the place</p>

        <textarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />

        <h2 className='text-2xl mt-4'>Perks</h2>
        <p className='text-gray-500 text-sm'>
          Select all the perks of your place
        </p>

        <div className='grid grid-cols-2 md:grid-col-3 lg:grid-cols-6 gap-2 mt-2'>
          <Perks selected={perks} onChange={setPerks} />
        </div>

        {preInput('Extra Info', 'House rules, etc...')}

        <textarea
          value={extraInfo}
          onChange={(e) => {
            setExtraInfo(e.target.value);
          }}
        />

        {preInput(
          'Check in&out times',
          'add check in and out time, remember to have some time window for cleaning the room between guests'
        )}
        <div className='grid sm:grid-cols-3 gap-2'>
          <div>
            {h3Description('Check in time')}
            <input
              type='text'
              placeholder='14:00'
              value={checkIn}
              onChange={(e) => {
                setCheckIn(e.target.value);
              }}
            />
          </div>

          <div>
            {h3Description('Check out time')}
            <input
              type='text'
              placeholder='11:00'
              value={checkOut}
              onChange={(e) => {
                setCheckOut(e.target.value);
              }}
            />
          </div>

          <div>
            {h3Description('Max number of guests')}
            <input
              type='number'
              placeholder='2'
              value={maxGuests}
              onChange={(e) => {
                setMaxGuests(Number(e.target.value));
              }}
            />
          </div>
        </div>

        <button className='primary my-4'>Save</button>
      </form>
    </div>
  );
};

export default PlacesFormPage;
