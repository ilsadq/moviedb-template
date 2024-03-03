import {useEffect, useLayoutEffect, useState} from "react";
import {PageResult} from "../../types/PageResult.ts";
import MoviesListTemplate from "../../components/templates/MoviesListTemplate.tsx";
import MovieDbClient from "../../clients/MovieDbClient.ts";
import {useNavigate, useSearchParams} from "react-router-dom";
import useAsideFilterStore from "../../stores/AsideFilterStore.ts";
import DefaultValues from "../../constants/DefaultValues.ts";
import MovieCardDetailsResponse from "../../types/response-types/MovieCardDetailsResponse.ts";

const SearchMoviesPage = () => {
    const [data, setData] = useState<PageResult<MovieCardDetailsResponse>>();

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const asideFilterStore = useAsideFilterStore();

    useLayoutEffect(() => {
        const search = searchParams.get("search");

        if (!search) return navigate("/");

        MovieDbClient.searchMovies({
            search: search,
            language: asideFilterStore.language || DefaultValues.Translation,
            page: asideFilterStore.page
        }).then(setData).catch(console.log);
    }, [searchParams, asideFilterStore]);

    useEffect(() => {
        return () => {
            asideFilterStore.setPage(DefaultValues.Page)
        };
    }, []);

    return <MoviesListTemplate data={data}/>
}

export default SearchMoviesPage;