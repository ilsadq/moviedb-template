import {SunIcon, MoonIcon} from "@heroicons/react/24/solid"
import useThemeStore from "../../stores/ThemeStore.ts";

const ThemeButton = () => {
    const themeStore = useThemeStore();

    const switchTheme = () => {
        if (themeStore.theme) themeStore.setLightTheme();
        else themeStore.setDarkTheme();
    }

    return (
        <button onClick={switchTheme} className="w-8 h-8 flex items-center justify-center">
            {themeStore.theme ? <SunIcon className="w-5 h-5"/> : <MoonIcon className="w-5 h-5"/>}
        </button>
    )
}

export default ThemeButton;