import CardInterface from "../../interfaces/cardInterface";
import "./style.css"

function Card({ name, city, country, favorite_sport }: CardInterface) {
  return (
    <div className="CardContainer">
      <h2>{name}</h2>
      <div>
        <p>{city}</p>
        <p>{country}</p>
        <p>{favorite_sport}</p>
      </div>
    </div>
  );
}

export default Card;