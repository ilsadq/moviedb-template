import {create} from "zustand";

interface TranslationsStoreState {
    translations: string[] | null;
    setTranslations: (translation: string[]) => void;
}

const useTranslationsStore = create<TranslationsStoreState>((set) => ({
    translations: null,
    setTranslations: translations => set(() => ({translations}))
}));

export default useTranslationsStore;
