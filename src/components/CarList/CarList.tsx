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
    const [locationCarsState, setLocationCarsState] = useState<Car[] | null>(null);

    // # Filter nach Location als Basisdaten
    useEffect(() => {
        const picUpLocation = formData?.formData?.picUpLocation;
        if (!picUpLocation) {
            return;
        }

        const locationCars = carData?.cars?.filter((item) =>
            item.locations.includes(picUpLocation)
        ) || [];

        setLocationCarsState(locationCars); // Behalte die nach Standort gefilterten Autos bei
        filterdCars?.setFilterdCars(locationCars); // Initialisiere gefilterte Autos
    }, [formData?.formData?.picUpLocation, carData?.cars]);

    // # Kombiniere alle aktiven Filter
    useEffect(() => {
        if (locationCarsState === null) return;

        // Muss ich machen da locationCarsState eine constante ist (state)
        let filteredCars = locationCarsState;

        //!Filter nach Typ
        const kfzTypes = filterUser?.userFilter?.type || [];
        if (kfzTypes.length > 0) {
            filteredCars = filteredCars.filter(car =>
                kfzTypes.includes(car.vehicleType)
            );
        }

        // !Filter nach Farbe
        const kfzColors = filterUser?.userFilter?.colors || [];
        if (kfzColors.length > 0) {
            filteredCars = filteredCars.filter(car =>
                kfzColors.includes(car.colors)
            );
        }

        // !Filtert nach DriveType
        const kfzDriveType = filterUser?.userFilter?.drivesType || []
        if (kfzDriveType.length > 0) {
            filteredCars = filteredCars.filter(car =>
                kfzDriveType.includes(car.fuel)
            )
        }

        // !Filter nach Gear
        const kfzGear = filterUser?.userFilter?.gear || []
        if (kfzGear.length > 0) {
            filteredCars = filteredCars.filter(car =>
                kfzGear.includes(car.gearType)
            )
        }

        // !Filter nach Preis
        const kfzPrice = filterUser?.userFilter?.priceDay

        if (kfzPrice === undefined) return


        if (kfzPrice > 0) {
            filteredCars = filteredCars.filter(car =>
                kfzPrice >= car.pricePerDay
            )
        }

        filterdCars?.setFilterdCars(filteredCars);

    }, [filterUser?.userFilter, locationCarsState]);

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
