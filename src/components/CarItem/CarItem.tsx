import Full from "../../assets/svg/Full";
import Gear from "../../assets/svg/Gear";
import Herz from "../../assets/svg/Herz";
import Persons from "../../assets/svg/Persons";
import { Car } from "../../Car";
import "./CarItem.css"

interface CarItemProps {
    item: Car
}

const CarItem: React.FC<CarItemProps> = ({ item }) => {


    return (
        <article className="car-item">
            <div className="hero">
                <h4>{item.brand} {item.model}</h4>
                <Herz />
            </div>
            <h6>{item.vehicleType}</h6>
            <div className="photo">
                <img src={item.carImg} alt={item.model} />
                <div className="white"></div>
            </div>
            <div className="icons">
                <div>
                    <Full />
                    <p>{item.consumption}</p>
                </div>
                <div>
                    <Gear />
                    <p>{item.gearType}</p></div>
                <div>
                    <Persons />
                    <p>{item.seats}</p>
                </div>
            </div>
            <div className="footer">
                <h4>${item.pricePerDay} / <span>day</span></h4>
                <a className="btn-main" href="#">Rent Now</a>
            </div>
        </article>
    );
}

export default CarItem;