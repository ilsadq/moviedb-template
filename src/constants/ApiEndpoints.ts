const ApiEndpoints = {
    PopularMovies: (page: number, lang: string, region: string) => {
        const url = new URL("https://api.themoviedb.org/3/movie/popular");
        url.searchParams.set("page", page.toString());
        url.searchParams.set("language", lang);
        url.searchParams.set("region", region);
        return url.toString();
    },
    MovieImage: (path: string) => {
        const url = new URL("https://image.tmdb.org/t/p/w500");
        url.pathname += path;
        return url.toString();
    },
    MovieDetails: (movieId: string, lang: string) => {
        const url = new URL("https://api.themoviedb.org/3/movie/");
        url.pathname += movieId;
        url.searchParams.set("language", lang);
        return url.toString();
    },
    GuestSession: () => {
        const url = new URL("https://api.themoviedb.org/3/authentication/guest_session/new");
        return url.toString();
    },
    GetCountries: (lang: string = "en-US") => {
        const url = new URL("https://api.themoviedb.org/3/configuration/countries");
        url.searchParams.set("language", lang);
        return url.toString();
    },
    GetLanguages: () => {
        const url = new URL("https://api.themoviedb.org/3/configuration/languages");
        return url.toString();
    },
    GetTranslations: () => {
        const url = new URL("https://api.themoviedb.org/3/configuration/primary_translations");
        return url.toString();
    },
    NowPlayingMovies: (page: number, lang: string, region: string) => {
        const url = new URL("https://api.themoviedb.org/3/movie/now_playing");
        url.searchParams.set("page", page.toString());
        url.searchParams.set("language", lang);
        url.searchParams.set("region", region);
        return url.toString();
    },
    SearchMovies: (query: string, lang: string) => {
        const url = new URL("https://api.themoviedb.org/3/search/movie");
        url.searchParams.set("query", query);
        url.searchParams.set("language", lang);
        return url.toString();
    },
    TopRatedMovies: (page: number, lang: string, region: string) => {
        const url = new URL("https://api.themoviedb.org/3/movie/top_rated");
        url.searchParams.set("page", page.toString())
        url.searchParams.set("language", lang);
        url.searchParams.set("region", region);
        return url.toString();
    },
    GetMovieVideosDetails: (movieId: string) => {
        const url = new URL(`https://api.themoviedb.org/3/movie/${movieId}/videos`);
        return url.toString();
    },
    GetMovieWatchProviders: (movieId: string) => {
        const url = new URL(`https://api.themoviedb.org/3/movie/${movieId}/watch/providers`);
        return url.toString();
    },
    GetMovieRecommendation: (movieId: string, page: number, language: string) => {
        const url = new URL(`https://api.themoviedb.org/3/movie/${movieId}/recommendations`);
        url.searchParams.set("page", page.toString());
        url.searchParams.set("language", language);
        return url.toString();
    },
    GetMovieReviews: (movieId: string, page: number, lang: string) => {
        const url = new URL(`https://api.themoviedb.org/3/movie/${movieId}/reviews`);
        url.searchParams.set("language", lang);
        url.searchParams.set("page", page.toString());
        return url.toString();
    }
}

export default ApiEndpoints;