import {create} from "zustand";
import LanguageResponse from "../types/response-types/LanguageResponse.ts";

interface LanguagesStoreState {
    languages: LanguageResponse[] | null;
    setLanguages: (languages: LanguageResponse[]) => void;
}

const useLanguagesStore = create<LanguagesStoreState>((set) => ({
    languages: null,
    setLanguages: languages => set(() => ({languages}))
}));

export default useLanguagesStore;
