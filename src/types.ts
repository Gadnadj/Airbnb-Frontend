import { Dispatch, SetStateAction } from "react";

export interface User {
    email: string,
    name: string,
    password: string,
}

export interface UserContextType {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
    ready: boolean;
}

export interface Place {
    _id: string;
    title: string;
    address: string;
    photos: string[];
    description: string;
    perks: string[];
    extraInfo: string;
    checkIn: number;
    checkOut: number;
    maxGuests: number;
    price: number;
}

export interface Booking {
    place: Place;
    checkIn: Date;
    checkOut: Date;
    name: string;
    phone: string;
    price: number;
    numOfNights: number;

}