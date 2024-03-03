import {create} from "zustand";
import DefaultValues from "../constants/DefaultValues.ts";

interface AsideFilterStoreState {
    country: string | undefined;
    setCountry: (country: string | undefined) => void;
    language: string | undefined;
    setLanguage: (language: string | undefined) => void;
    translation: string | undefined;
    setTranslation: (translation: string | undefined) => void;
    page: number;
    setPage: (page: number) => void;
    resetFilter: () => void;
}

const useAsideFilterStore = create<AsideFilterStoreState>((set) => ({
    country: undefined,
    setCountry: country => set(state => ({
        ...state,
        country
    })),
    language: undefined,
    setLanguage: language => set(state => ({
        ...state,
        language
    })),
    translation: undefined,
    setTranslation: translation => set(state => ({
        ...state,
        translation
    })),
    resetFilter: () => set(() => ({
        country: "",
        language: "",
        translation: ""
    })),
    page: DefaultValues.Page,
    setPage: page => set(state => ({
        ...state,
        page
    }))
}));

export default useAsideFilterStore;