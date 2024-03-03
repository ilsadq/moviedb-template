import {Link, NavLink} from "react-router-dom";
import ThemeButton from "../theme-button/ThemeButton.tsx";

const Header = () => {
    return (
        <header className="h-24 py-5 flex gap-x-5 items-center">
            <h1 className="text-4xl font-black">
                <Link to="/" className="inline-block sm:hidden whitespace-nowrap">Y/S</Link>
                <Link to="/" className="hidden sm:inline-block">You Search</Link>
            </h1>

            <div className="ml-auto flex items-center gap-x-2.5">
                <NavLink to="/top-rated"
                         className={({isActive}) => isActive ? "text-blue-500 dark:text-yellow-500 underline text-center" : "dark:text-white text-center"}>
                    Top rated
                </NavLink>
                <NavLink to="/now-playing"
                         className={({isActive}) => isActive ? "text-blue-500 dark:text-yellow-500 underline text-center" : "text-gray-500 dark:text-white text-center"}>
                    Now Playing
                </NavLink>
                <NavLink to="/"
                         className={({isActive}) => isActive ? "text-blue-500 dark:text-yellow-500 underline text-center" : "text-gray-500 dark:text-white text-center"}>
                    Popular
                </NavLink>
                <ThemeButton/>
            </div>
        </header>
    )
}

export default Header;