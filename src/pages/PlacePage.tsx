import { useParams } from "react-router-dom"

type Props = {}

const PlacePage = (props: Props) => {
    const { id } = useParams();



    return (
        <div>{PlacePage}</div>
    )
}

export default PlacePage