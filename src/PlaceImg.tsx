import { Place } from './types';

type Props = {
    place: Place;
    index: number;
    className: string;
}

const PlaceImg = ({ place, index = 0, className = '' }: Props) => {
    if (!place.photos?.length) {
        return '';
    }

    if (!className)
        className = 'object-cover'
    return (
        <img
            className={className}
            src={'http://localhost:4000/uploads/' + place.photos[index]}
            alt="Place preview"
        />
    )
}

export default PlaceImg;