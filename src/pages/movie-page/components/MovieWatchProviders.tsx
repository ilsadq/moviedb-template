import {useLayoutEffect, useState} from "react";
import MovieDbClient from "../../../clients/MovieDbClient.ts";
import WatchProvidersResponse from "../../../types/response-types/MovieWatchProvidersResponse.ts";
import ApiEndpoints from "../../../constants/ApiEndpoints.ts";

export interface Props {
    movieId: string | undefined;
}

const MovieWatchProviders = ({movieId}: Props) => {
    const [data, setData] = useState<WatchProvidersResponse>();

    useLayoutEffect(() => {
        if (!movieId) return;
        MovieDbClient.getMovieWatchProviders(movieId).then(setData).catch(console.log);
    }, [movieId]);

    return (
        <ul className="min-h-96 pb-20 mt-10">
            {data && (
                Object.keys(data.results).map(x => {
                    const watchProvider = data.results[x];
                    return (
                        <li className="h-14 px-2.5 flex items-center">
                            <a target="_blank" href={watchProvider.link}
                               className="underline hover:text-blue-500 dark:hover:text-yellow-500 flex items-center gap-x-2.5">
                                Watch on {x} language
                                {watchProvider.buy?.map(y => (
                                    <img src={ApiEndpoints.MovieImage(y.logo_path)}
                                         alt={y.provider_name}
                                         className="w-10 h-10 aspect-square rounded-xl hidden sm:inline-block"
                                    />
                                ))}
                            </a>
                        </li>
                    )
                })
            )}
        </ul>
    )
}

export default MovieWatchProviders;