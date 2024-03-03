import {useEffect, useLayoutEffect, useState} from "react";
import {PageResult} from "../../types/PageResult.ts";
import useAsideFilterStore from "../../stores/AsideFilterStore.ts";
import MovieDbClient from "../../clients/MovieDbClient.ts";
import MoviesListTemplate from "../../components/templates/MoviesListTemplate.tsx";
import DefaultValues from "../../constants/DefaultValues.ts";
import MovieCardDetailsResponse from "../../types/response-types/MovieCardDetailsResponse.ts";

const NowPlayingPage = () => {
    const asideFilterStore = useAsideFilterStore();
    const [data, setData] = useState<PageResult<MovieCardDetailsResponse>>();

    useLayoutEffect(() => {
        MovieDbClient.getNowPlayingMovies({
            page: asideFilterStore.page,
            language: asideFilterStore.translation || DefaultValues.Translation,
            region: asideFilterStore.country || DefaultValues.Country
        }).then(setData).catch(console.log);
    }, [asideFilterStore]);

    useEffect(() => {
        return () => {
            asideFilterStore.setPage(DefaultValues.Page)
        };
    }, []);

    return <MoviesListTemplate data={data}/>
}

export default NowPlayingPage;