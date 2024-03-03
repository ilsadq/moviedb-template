import MoviesListTemplate from "../../components/templates/MoviesListTemplate.tsx";
import {useEffect, useLayoutEffect, useState} from "react";
import {PageResult} from "../../types/PageResult.ts";
import MovieCardDetailsResponse from "../../types/response-types/MovieCardDetailsResponse.ts";
import MovieDbClient from "../../clients/MovieDbClient.ts";
import {useNavigate, useParams} from "react-router-dom";
import useAsideFilterStore from "../../stores/AsideFilterStore.ts";
import DefaultValues from "../../constants/DefaultValues.ts";

const MovieRecommendation = () => {
    const [data, setData] = useState<PageResult<MovieCardDetailsResponse>>();

    const {movieId} = useParams();
    const navigate = useNavigate();
    const asideFilterStore = useAsideFilterStore();

    useLayoutEffect(() => {
        if (movieId == undefined) return navigate("/404");

        MovieDbClient.getMovieRecommendation({
            movieId: movieId,
            language: asideFilterStore.translation || DefaultValues.Translation,
            page: asideFilterStore.page || DefaultValues.Page
        }).then(setData).catch(console.log);

    }, [movieId, asideFilterStore]);

    useEffect(() => {
        return () => {
            asideFilterStore.setPage(DefaultValues.Page)
        };
    }, []);

    return <MoviesListTemplate data={data}/>
}

export default MovieRecommendation;