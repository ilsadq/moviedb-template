import MoviesListTemplate from "../../components/templates/MoviesListTemplate.tsx";
import {useEffect, useLayoutEffect, useState} from "react";
import {PageResult} from "../../types/PageResult.ts";
import MovieCardDetailsResponse from "../../types/response-types/MovieCardDetailsResponse.ts";
import MovieDbClient from "../../clients/MovieDbClient.ts";
import useAsideFilterStore from "../../stores/AsideFilterStore.ts";
import DefaultValues from "../../constants/DefaultValues.ts";

const TopRatedPage = () => {
    const asideFilterStore = useAsideFilterStore();
    const [data, setData] = useState<PageResult<MovieCardDetailsResponse>>();

    useLayoutEffect(() => {
        MovieDbClient.getTopRatedMovies({
            page: asideFilterStore.page,
            region: asideFilterStore.country || DefaultValues.Country,
            language: asideFilterStore.translation || DefaultValues.Translation
        }).then(setData).catch(console.log);
    }, [asideFilterStore]);

    useEffect(() => {
        return () => {
            asideFilterStore.setPage(DefaultValues.Page)
        };
    }, []);

    return <MoviesListTemplate data={data}/>
}

export default TopRatedPage;