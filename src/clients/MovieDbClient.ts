import {PageResult} from "../types/PageResult.ts";
import ApiEndpoints from "../constants/ApiEndpoints.ts";
import GuestSessionResponse from "../types/response-types/GuestSessionResponse.ts";
import ky from "ky";
import {CountryResponse} from "../types/response-types/CountryResponse.ts";
import LanguageResponse from "../types/response-types/LanguageResponse.ts";
import PopularMoviesRequest from "../types/request-types/PopularMoviesRequest.ts";
import NowPlayingMoviesRequest from "../types/request-types/NowPlayingMoviesRequest.ts";
import SearchMoviesRequest from "../types/request-types/SearchMoviesRequest.ts";
import MovieDetailsRequest from "../types/request-types/MovieDetailsRequest.ts";
import MovieCardDetailsResponse from "../types/response-types/MovieCardDetailsResponse.ts";
import MovieDetailsResponse from "../types/response-types/MovieDetailsResponse.ts";
import DefaultValues from "../constants/DefaultValues.ts";
import TopRatedMoviesRequest from "../types/request-types/TopRatedMoviesRequest.ts";
import MovieVideoResponse from "../types/response-types/MovieVideoResponse.ts";
import WatchProvidersResponse from "../types/response-types/MovieWatchProvidersResponse.ts";
import MovieRecommendationRequest from "../types/request-types/MovieRecommendationRequest.ts";
import MoviesReviewsRequest from "../types/request-types/MoviesReviewsRequest.ts";
import MovieReviewResponse from "../types/response-types/MovieReviewsResponse.ts";

const api = ky.extend({
    hooks: {
        beforeRequest: [
            request => {
                request.headers.set("Authorization", DefaultValues.AuthorizationToken);
            }
        ]
    }
})

class MovieDbClient {
    public static async getPopularMovies(request: PopularMoviesRequest) {
        const response = await api.get(ApiEndpoints.PopularMovies(request.page, request.language, request.region));
        if (!response.ok) throw new Error("Failed to fetch \"get popular movies\"");
        return await response.json<PageResult<MovieCardDetailsResponse>>();
    }

    public static async getNowPlayingMovies(request: NowPlayingMoviesRequest) {
        const response = await api.get(ApiEndpoints.NowPlayingMovies(request.page, request.language, request.region));
        if (!response.ok) throw new Error("Failed to fetch \"get now playing movies\"");
        return await response.json<PageResult<MovieCardDetailsResponse>>();
    }

    public static async getTopRatedMovies(request: TopRatedMoviesRequest) {
        const response = await api.get(ApiEndpoints.TopRatedMovies(request.page, request.language, request.region))
        if (!response.ok) throw new Error("Failed to fetch \"top rated movies\"");
        return await response.json<PageResult<MovieCardDetailsResponse>>();
    }

    public static async searchMovies(request: SearchMoviesRequest) {
        const response = await api.get(ApiEndpoints.SearchMovies(request.search, request.language));
        if (!response.ok) throw new Error("Failed to fetch \"search movies\"");
        return await response.json<PageResult<MovieCardDetailsResponse>>();
    }

    public static async getMovieDetails(request: MovieDetailsRequest) {
        const response = await api.get(ApiEndpoints.MovieDetails(request.movieId, request.lang));
        if (!response.ok) throw new Error("Failed to fetch \"get movies details\"");
        return await response.json<MovieDetailsResponse>();
    }

    public static async createGuestSession() {
        const response = await api.get(ApiEndpoints.GuestSession());
        if (!response.ok) throw new Error("Failed to fetch \"create guest session\"");

        const data = await response.json<GuestSessionResponse>();
        if (!data.success) throw new Error("Failed to create guest session");

        return data;
    }

    public static async getCountries() {
        const response = await api.get(ApiEndpoints.GetCountries());
        if (!response.ok) throw new Error("Failed to fetch \"get countries\"");
        return await response.json<CountryResponse[]>();
    }

    public static async getLanguages() {
        const response = await api.get(ApiEndpoints.GetLanguages());
        if (!response.ok) throw new Error("Failed to fetch \"get languages\"");
        return await response.json<LanguageResponse[]>();
    }

    public static async getTranslations() {
        const response = await api.get(ApiEndpoints.GetTranslations());
        if (!response.ok) throw new Error("Failed to fetch \"get translations\"");
        return await response.json<string[]>();
    }

    public static async getMovieVideosDetails(movieId: string) {
        const response = await api.get(ApiEndpoints.GetMovieVideosDetails(movieId.toString()))
        if (!response.ok) throw new Error("Failed to fetch \"get movie videos\"");
        return await response.json<MovieVideoResponse>();
    }

    public static async getMovieWatchProviders(movieId: string) {
        const response = await api.get(ApiEndpoints.GetMovieWatchProviders(movieId));
        if (!response.ok) throw new Error("Failed to fetch \"get movie watch provide\"");
        return await response.json<WatchProvidersResponse>();
    }

    public static async getMovieRecommendation(request: MovieRecommendationRequest) {
        const response = await api.get(ApiEndpoints.GetMovieRecommendation(request.movieId, request.page, request.language));
        if (!response.ok) throw new Error("Failed to fetch \"movie recommendation\"");
        return await response.json<PageResult<MovieCardDetailsResponse>>();
    }

    public static async getMovieReviews(request: MoviesReviewsRequest) {
        const response = await api.get(ApiEndpoints.GetMovieReviews(request.movie_id, request.page, request.language));
        if (!response.ok) throw new Error("Failed to fetch \"movie reviews\"");
        return await response.json<PageResult<MovieReviewResponse>>();
    }
}

export default MovieDbClient;