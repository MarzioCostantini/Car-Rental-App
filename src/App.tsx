import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import { Car } from './Car';
import { useState } from 'react';
import { CarContext, ExtraCarInfoContext, FilterdCarsContext, FormDataContext, LoadingContext, SideBarContext, UserFilterContext } from './Context/context';
import Loading from './pages/Loading';
import { FormDataInterface } from './FromData';
import { ExtraCarInfoInterface } from './ExtraCarInfo';
import { UserFilterInterface } from './UserFilter';

function App() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sideBar, setSideBar] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormDataInterface | null>(null);
  const [extraCarInfo, setExtraCarInfo] = useState<ExtraCarInfoInterface | null>(null);
  const [userFilter, setUserFilter] = useState<UserFilterInterface | null>(null);
  const [filterdCars, setFilterdCars] = useState<Car[]>([]);

  return (
    <CarContext.Provider value={{ cars, setCars }}>
      <LoadingContext.Provider value={{ loading, setLoading }}>
        <SideBarContext.Provider value={{ sideBar, setSideBar }}>
          <FormDataContext.Provider value={{ formData, setFormData }}>
            <ExtraCarInfoContext.Provider value={{ extraCarInfo, setExtraCarInfo }}>
              <UserFilterContext.Provider value={{ userFilter, setUserFilter }}>
                <FilterdCarsContext.Provider value={{ filterdCars, setFilterdCars }}>
                  {loading ? (
                    <Loading />
                  ) : (
                    <BrowserRouter>
                      <Routes>
                        <Route path="/" element={<Home />} />
                      </Routes>
                    </BrowserRouter>
                  )}
                </FilterdCarsContext.Provider>
              </UserFilterContext.Provider>
            </ExtraCarInfoContext.Provider>
          </FormDataContext.Provider>
        </SideBarContext.Provider>
      </LoadingContext.Provider>
    </CarContext.Provider >
  );
}

export default App;
