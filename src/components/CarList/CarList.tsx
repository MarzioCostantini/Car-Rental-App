import { useContext, useEffect, useState } from "react";
import "./CarList.css";
import { CarContext, FilterdCarsContext, FormDataContext, UserFilterContext } from "../../Context/context";
import CarItem from "../CarItem/CarItem";

const CarList = () => {
    const carData = useContext(CarContext);
    const filterUser = useContext(UserFilterContext);
    const formData = useContext(FormDataContext);
    const filterdCars = useContext(FilterdCarsContext);

    const [showCars, setShowCars] = useState<number>(15);

    useEffect(() => {
        // Überprüfen, ob picUpLocation definiert ist
        const picUpLocation = formData?.formData?.picUpLocation;
        if (!picUpLocation) {
            // Wenn picUpLocation nicht gesetzt ist, beende den useEffect hier
            return;
        }

        //! Filtert die Autos nach Location
        const locationCars = carData?.cars?.filter((item) =>
            item.locations.includes(picUpLocation)
        ) || [];

        //! Filtert die Autos nach Fahrzeugtyp
        const kfzTypes = filterUser?.userFilter?.type || [];

        const typeCars = locationCars.filter(car =>
            kfzTypes.length > 0 ? kfzTypes.includes(car.vehicleType) : true
        );

        // ! Filtert die Auto nach Farbe
        const kfzColor = filterUser?.userFilter?.colors

        console.log({ kfzColor });


        // Kombiniere die Filter-Ergebnisse so, dass nur Autos bleiben, die beide Kriterien erfüllen
        const combinedCars = typeCars;

        console.log("Gefilterte Autos nach Standort und Fahrzeugtyp:", combinedCars);

        // Setze die gefilterten Autos in den Zustand
        filterdCars?.setFilterdCars(combinedCars);

    }, [formData?.formData?.picUpLocation, filterUser?.userFilter, carData?.cars]);





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
