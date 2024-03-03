import {create} from "zustand";
import DefaultValues from "../constants/DefaultValues.ts";

interface ThemeStoreState {
    theme: boolean;
    setDarkTheme: () => void;
    setLightTheme: () => void;
}

const classList = document.documentElement.classList;

const setTheme = (value: boolean): boolean => {
    if (value) {
        window.localStorage.setItem(DefaultValues.ThemeStorageName, DefaultValues.DarkTheme);
        if (!classList.contains(DefaultValues.DarkTheme)) classList.add(DefaultValues.DarkTheme);
    } else {
        window.localStorage.setItem(DefaultValues.ThemeStorageName, DefaultValues.LightTheme);
        if (classList.contains(DefaultValues.DarkTheme)) classList.remove(DefaultValues.DarkTheme);
    }
    return value;
}

const useThemeStore = create<ThemeStoreState>(set => ({
    theme: setTheme(window.localStorage.getItem(DefaultValues.ThemeStorageName) === DefaultValues.DarkTheme),
    setDarkTheme: () => set(() => {
        return {
            theme: setTheme(true)
        }
    }),
    setLightTheme: () => set(() => {
        return {
            theme: setTheme(false)
        }
    })
}))


export default useThemeStore;