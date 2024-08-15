import React, { createContext } from "react";
import { Car } from "../Car";
import { FormDataInterface } from "../FromData";
import { ExtraCarInfoInterface } from "../ExtraCarInfo";
import { UserFilterInterface } from "../UserFilter";

// # Cars
export interface CarContextType {
  cars: Car[] | undefined;
  setCars: React.Dispatch<React.SetStateAction<Car[]>>;
}

export const CarContext = createContext<CarContextType | undefined>(undefined);

// # Loading 
export interface LoadingContextType {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// # Sidebar
export interface SideBarContextType {
  sideBar: boolean;
  setSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SideBarContext = createContext<SideBarContextType | undefined>(undefined);

// # Form Data (Pickup & Drop off)
export interface FormDataContextType {
  formData: FormDataInterface | null;
  setFormData: React.Dispatch<React.SetStateAction<FormDataInterface | null>>;
}

export const FormDataContext = createContext<FormDataContextType | undefined>(undefined);

// # Zusatzdaten, Types, FahrzeugDaten, Schaltungstypen & Antriebstypen
interface ExtraCarInfoContextType {
  extraCarInfo: ExtraCarInfoInterface | null;
  setExtraCarInfo: React.Dispatch<React.SetStateAction<ExtraCarInfoInterface | null>>;
}

export const ExtraCarInfoContext = createContext<ExtraCarInfoContextType | undefined>(undefined);

// # user Filter, daten die der user als Filter gesasetzt hat zb, Type, Farbe, Gear etc
interface UserFilterInputContextType {
  userFilter: UserFilterInterface | null;
  setUserFilter: React.Dispatch<React.SetStateAction<UserFilterInterface | null>>;
}

export const UserFilterContext = createContext<UserFilterInputContextType | undefined>(undefined);

// # Filterd Cars - Autos die gefunden worden sind passen zum filter seitlich und die formadaten
interface FilterdCarsContextType {
  filterdCars: Car[];
  setFilterdCars: React.Dispatch<React.SetStateAction<Car[] | undefined>>;
}
export const FilterdCarsContext = createContext<FilterdCarsContextType | undefined>(undefined);
