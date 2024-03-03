import {CountryResponse} from "../types/response-types/CountryResponse.ts";
import {create} from "zustand";

interface CountriesStoreState {
    countries: CountryResponse[] | null;
    setCountries: (countries: CountryResponse[]) => void;
}

const useCountriesStore = create<CountriesStoreState>((set) => ({
    countries: null,
    setCountries: countries => set(() => ({countries}))
}));

export default useCountriesStore;