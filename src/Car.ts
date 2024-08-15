export interface Car {
    vehicleID: string;
    brand: string;
    model: string;
    year: number;
    vehicleType: string;
    locations: string[];
    pricePerDay: number;
    availability: boolean;
    car: string;
    electricVehicle: boolean;
    carImg: string;
    seats: number;
    luggage: number;
    horstpower: string;
    price: Price;
    ps: number;
    consumption: string;
    fuel: string;
    gearType: string;
    colors: string
}

export interface Price {
    amount: number;
    currency: string;
}