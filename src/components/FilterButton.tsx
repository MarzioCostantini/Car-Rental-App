import { useContext } from "react";
import Filter from "../assets/svg/Filter";
import { FormDataContext, SideBarContext } from "../Context/context";

const FilterButton = () => {
    const sidbarInfo = useContext(SideBarContext);
    const formData = useContext(FormDataContext);

    const showSidbar = () => {
        sidbarInfo?.setSideBar((prev => !prev))
    }
    return (
        <button disabled={formData?.formData?.picUpLocation === ""} className="btn-main filter-btn" onClick={showSidbar}>
            <Filter />
            Filter
        </button>
    );
}

export default FilterButton;