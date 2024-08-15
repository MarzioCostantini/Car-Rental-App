import { useContext, useEffect, useState } from "react";
import "./CarList.css";
import { CarContext, FilterdCarsContext, FormDataContext, UserFilterContext } from "../../Context/context";
import CarItem from "../CarItem/CarItem";
import { Car } from "../../Car";

const CarList = () => {
    const carData = useContext(CarContext);
    const filterUser = useContext(UserFilterContext);
    const formData = useContext(FormDataContext);
    const filterdCars = useContext(FilterdCarsContext);


    const [showCars, setShowCars] = useState<number>(15);
    const [locationCarsState, setLocationCarsState] = useState<Car[] | null>(null)

    console.log("Autos nach Location Gefiltert", locationCarsState);


    // # Filter nach Location als Basisdaten
    useEffect(() => {
        // Überprüfen, ob picUpLocation definiert ist
        const picUpLocation = formData?.formData?.picUpLocation;
        if (!picUpLocation) {
            // Wenn picUpLocation nicht gesetzt ist, beende den useEffect hier
            return;
        }

        // Filtert die Autos nach Location
        const locationCars = carData?.cars?.filter((item) =>
            item.locations.includes(picUpLocation)
        ) || [];

        filterdCars?.setFilterdCars(locationCars)
        setLocationCarsState(locationCars)

    }, [formData?.formData?.picUpLocation, filterUser?.userFilter]);

    // ! Filter Nach Typ in den locationCarsState
    useEffect(() => {
        if (locationCarsState === null) {
            return
        }

        const kfzTypes = filterUser?.userFilter?.type || [];

        const typeCars = locationCarsState.filter(car =>
            kfzTypes.length > 0 ? kfzTypes.includes(car.vehicleType) : true
        );

        filterdCars?.setFilterdCars(typeCars);

    }, [filterUser?.userFilter?.type]);

    // ! Filter Nach Farbe in den locationCarsState
    useEffect(() => {
        if (locationCarsState === null) {
            return
        }

        const kfzColors = filterUser?.userFilter?.colors || [];

        const colorCars = locationCarsState.filter(car =>
            kfzColors.length > 0 ? kfzColors.includes(car.colors) : true
        );

        filterdCars?.setFilterdCars(colorCars);

    }, [filterUser?.userFilter?.colors]);


    return (
        <>
            {(!formData?.formData?.picUpLocation) ? (
                <p>Please enter a location to see available cars.</p>
            ) : filterdCars?.filterdCars.length === 0 ? (
                <p>Unfortunately we could not find anything with your filters.</p>
            ) : (
                <div>
                    <section className="car-list">
                        {filterdCars?.filterdCars.slice(0, showCars).map((item, index) => (
                            <CarItem key={index} item={item} />
                        ))}
                    </section>
                    <div className="btn-more-wrp">
                        <div className="btn-container">
                            <button onClick={() => setShowCars(showCars + 10)} className="show-more-btn btn-main">Show more cars</button>
                        </div>
                        <p>{filterdCars?.filterdCars.length} Cars total</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default CarList;
