import { useContext, useEffect } from "react"
import { CarContext, ExtraCarInfoContext } from "../Context/context";

const FetchData = () => {
    // Holt sich den Cars context
    const cardata = useContext(CarContext);
    const extraCarInfo = useContext(ExtraCarInfoContext);

    if (!cardata) {
        return <div>Loading...</div>;
    }




    // ! Autos Fetchen
    useEffect(() => {
        fetch("https://raw.githubusercontent.com/MarzioCostantini/cars/main/vehicles.json")
            .then((res) => res.json())
            .then(data => cardata.setCars(data))
            .catch(err => console.error("Fehler bein fetch,", err))
    }, [])


    // ! Zusatzinfos Fetchen wir Auto antrieb
    // Zusatzinfos fetchen
    useEffect(() => {
        const fetchExtraCarInfo = () => {
            Promise.all([
                fetch('https://raw.githubusercontent.com/MarzioCostantini/cars/main/vehicleTypes.json').then(res => res.json()),
                fetch('https://raw.githubusercontent.com/MarzioCostantini/cars/main/vehicleColors.json').then(res => res.json()),
                fetch('https://raw.githubusercontent.com/MarzioCostantini/cars/main/vehiclesGears.json').then(res => res.json()),
                fetch('https://raw.githubusercontent.com/MarzioCostantini/cars/main/vehicleFuels.json').then(res => res.json())
            ])
                .then(([types, colors, gear, drivesType]) => {
                    extraCarInfo?.setExtraCarInfo({
                        types: types,
                        colors: colors,
                        gear: gear,
                        drivesType: drivesType,
                        priceDay: 0
                    });
                })
                .catch(error => console.error("Fehler beim Fetchen der Zusatzinfos:", error));
        };

        fetchExtraCarInfo();
    }, []);


    return (


        <div>
            loading data...
        </div>
    );
}

export default FetchData;