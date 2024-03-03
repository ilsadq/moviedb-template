import {useEffect, useLayoutEffect, useState} from "react";
import MovieDbClient from "../../clients/MovieDbClient.ts";
import {PageResult} from "../../types/PageResult.ts";
import useAsideFilterStore from "../../stores/AsideFilterStore.ts";
import MoviesListTemplate from "../../components/templates/MoviesListTemplate.tsx";
import DefaultValues from "../../constants/DefaultValues.ts";
import defaultValues from "../../constants/DefaultValues.ts";
import MovieCardDetailsResponse from "../../types/response-types/MovieCardDetailsResponse.ts";

const HomePage = () => {
    const asideFilterStore = useAsideFilterStore();

    const [data, setData] = useState<PageResult<MovieCardDetailsResponse>>();

    useLayoutEffect(() => {
        MovieDbClient.getPopularMovies({
            page: asideFilterStore.page,
            region: asideFilterStore.country || DefaultValues.Country,
            language: asideFilterStore.translation || defaultValues.Translation
        }).then(setData).catch(console.log);
    }, [asideFilterStore]);

    useEffect(() => {
        return () => {
            asideFilterStore.setPage(DefaultValues.Page)
        };
    }, []);

    return <MoviesListTemplate data={data} />
}

export default HomePage;