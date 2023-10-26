import CardInterface from "../../interfaces/cardInterface";
import Card from "../card";
import './style.css'

interface Props {
    csvData: CardInterface[];
}

function CardsList({ csvData }: Props) {
    return (
        <div className="carousel">
            <ul className="carousel-container">
                {csvData.map((item, index) => (
                    <li
                        key={index}
                        className="carousel-item"
                    >
                        <Card
                            key={index}
                            name={item.name}
                            city={item.city}
                            country={item.country}
                            favorite_sport={item.favorite_sport}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CardsList;