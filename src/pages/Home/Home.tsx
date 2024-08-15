import { useContext } from "react";
import Banner from "../../components/Banner/Banner";
import FilterBar from "../../components/FilterBar/FilterBar";
import FilterButton from "../../components/FilterButton";
import Form from "../../components/Form/Form";
import Header from "../../components/Header/Header";
import { SideBarContext } from "../../Context/context";
import "./Home.css"
import CarList from "../../components/CarList/CarList";

const Home = () => {
    const sidbarInfo = useContext(SideBarContext);

    return (
        <>
            <Header />
            <main className={`layout ${sidbarInfo?.sideBar ? "show-sidebar" : "hide-sidebar"}`}>
                {sidbarInfo?.sideBar != false && <FilterBar />}
                <div>
                    {/* <Banner /> */}
                    <Form />
                    <div className="btn-area">
                        <FilterButton />
                    </div>
                    <CarList />
                </div>

            </main>
        </>
    );
}

export default Home;