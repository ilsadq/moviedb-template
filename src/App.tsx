import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/home-page/HomePage.tsx";
import Header from "./components/header/Header.tsx";
import MoviePage from "./pages/movie-page/MoviePage.tsx";
import NotFound from "./pages/not-found/NotFound.tsx";
import {useLayoutEffect} from "react";
import MovieDbClient from "./clients/MovieDbClient.ts";
import useSessionStore from "./stores/UseSessionStore.ts";
import NowPlayingPage from "./pages/now-playing/NowPlayingPage.tsx";
import SearchMoviesPage from "./pages/search-movies/SearchMoviesPage.tsx";
import TopRatedPage from "./pages/top-rated/TopRatedPage.tsx";
import MovieRecommendation from "./pages/movie-recommendation/MovieRecommendation.tsx";

const App = () => {
    const sessionStore = useSessionStore();

    useLayoutEffect(() => {
        MovieDbClient.createGuestSession()
            .then(x => {
                sessionStore.setGuestSession(x.guest_session_id);
                sessionStore.setExpiresAt(x.expires_at);
            })
            .catch(console.log);
    }, []);

    return (
        <div className={`container min-h-screen flex flex-col`}>
            <BrowserRouter>
                <div className="w-full">
                    <Header/>
                </div>

                <Routes>
                    <Route element={<HomePage/>} path="/"/>
                    <Route element={<MoviePage/>} path="/movie/:movieId"/>
                    <Route element={<MovieRecommendation/>} path="/movie/:movieId/recommendation/"/>
                    <Route element={<NotFound/>} path="/404"/>
                    <Route element={<NowPlayingPage/>} path="/now-playing"/>
                    <Route element={<SearchMoviesPage/>} path="/search"/>
                    <Route element={<TopRatedPage/>} path="/top-rated"/>
                    <Route element={<NotFound/>} path="*"/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
