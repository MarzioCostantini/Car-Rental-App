import { useContext, useEffect, useState } from "react";
import { ExtraCarInfoContext, UserFilterContext } from "../../Context/context";
import "./FilterBar.css";
import { UserFilterInterface } from "../../UserFilter";

const FilterBar = () => {
    const filterOption = useContext(ExtraCarInfoContext);
    const filterData = useContext(UserFilterContext);

    const isLoading = !filterOption || !filterOption.extraCarInfo || !filterOption.extraCarInfo.types || !filterOption.extraCarInfo.colors || !filterOption.extraCarInfo.drivesType || !filterOption.extraCarInfo.gear;

    // Initialisiere die Filter mit den Werten aus dem Kontext oder setze alle Checkboxen standardmäßig auf ausgewählt
    const [priceRange, setPriceRange] = useState<number>(filterData?.userFilter?.priceDay || 450);
    const [selectedTypes, setSelectedTypes] = useState<string[]>(filterData?.userFilter?.type || []);
    const [selectedColors, setSelectedColors] = useState<string[]>(filterData?.userFilter?.colors || []);
    const [selectedDriveTypes, setSelectedDriveTypes] = useState<string[]>(filterData?.userFilter?.drivesType || []);
    const [selectedGears, setSelectedGears] = useState<string[]>(filterData?.userFilter?.gear || []);

    // Setze standardmäßig alle Checkboxen auf ausgewählt, wenn noch keine Auswahl getroffen wurde
    useEffect(() => {
        if (filterOption && filterOption.extraCarInfo) {
            if (selectedTypes.length === 0) {
                setSelectedTypes(filterOption.extraCarInfo.types);
            }
            if (selectedColors.length === 0) {
                setSelectedColors(filterOption.extraCarInfo.colors);
            }
            if (selectedDriveTypes.length === 0) {
                setSelectedDriveTypes(filterOption.extraCarInfo.drivesType);
            }
            if (selectedGears.length === 0) {
                setSelectedGears(filterOption.extraCarInfo.gear);
            }
        }
    }, [filterOption]);

    // Funktion, um die aktuellen Filtereinstellungen im Kontext zu speichern
    useEffect(() => {
        let newData: UserFilterInterface = {
            type: selectedTypes,
            colors: selectedColors,
            gear: selectedGears,
            drivesType: selectedDriveTypes,
            priceDay: priceRange
        };

        filterData?.setUserFilter(newData);
    }, [priceRange, selectedTypes, selectedColors, selectedDriveTypes, selectedGears]);

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPriceRange(Number(event.target.value));
    };

    const handleCheckboxChange = (setSelectedFunction: React.Dispatch<React.SetStateAction<string[]>>) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, checked } = event.target;
        setSelectedFunction(prevSelected =>
            checked ? [...prevSelected, id] : prevSelected.filter(item => item !== id)
        );
    };

    return (
        <aside className="filter-bar">
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <section>
                        <h3>Type</h3>
                        {filterOption?.extraCarInfo?.types.map((item, index) => (
                            <div className="checkbox-wrapper" key={index}>
                                <input
                                    type="checkbox"
                                    id={item}
                                    checked={selectedTypes.includes(item)}
                                    onChange={handleCheckboxChange(setSelectedTypes)}
                                />
                                <label htmlFor={item}>{item}</label>
                            </div>
                        ))}
                    </section>
                    <section>
                        <h3>Color</h3>
                        {filterOption?.extraCarInfo?.colors.map((item, index) => (
                            <div className="checkbox-wrapper" key={index}>
                                <input
                                    type="checkbox"
                                    id={item}
                                    checked={selectedColors.includes(item)}
                                    onChange={handleCheckboxChange(setSelectedColors)}
                                />
                                <label htmlFor={item}>{item}</label>
                            </div>
                        ))}
                    </section>
                    <section>
                        <h3>Drive Type</h3>
                        {filterOption?.extraCarInfo?.drivesType.map((item, index) => (
                            <div className="checkbox-wrapper" key={index}>
                                <input
                                    type="checkbox"
                                    id={item}
                                    checked={selectedDriveTypes.includes(item)}
                                    onChange={handleCheckboxChange(setSelectedDriveTypes)}
                                />
                                <label htmlFor={item}>{item}</label>
                            </div>
                        ))}
                    </section>
                    <section>
                        <h3>Gear</h3>
                        {filterOption?.extraCarInfo?.gear.map((item, index) => (
                            <div className="checkbox-wrapper" key={index}>
                                <input
                                    type="checkbox"
                                    id={item}
                                    checked={selectedGears.includes(item)}
                                    onChange={handleCheckboxChange(setSelectedGears)}
                                />
                                <label htmlFor={item}>{item}</label>
                            </div>
                        ))}
                    </section>
                    <section>
                        <h3>Price</h3>
                        <input
                            type="range"
                            id="priceRange"
                            name="priceRange"
                            min="0"
                            max="450"
                            step={10}
                            value={priceRange}
                            onChange={handlePriceChange}
                        />
                        <span>Max. ${priceRange.toFixed(2)} / Day</span>
                    </section>
                </>
            )}
        </aside>
    );
};

export default FilterBar;
