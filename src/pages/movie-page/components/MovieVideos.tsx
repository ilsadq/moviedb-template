import {useLayoutEffect, useState} from "react";
import MovieVideoResponse from "../../../types/response-types/MovieVideoResponse.ts";
import MovieDbClient from "../../../clients/MovieDbClient.ts";
import NoResultsTemplate from "../../../components/templates/NoResultsTemplate.tsx";

export interface Props {
    movieId: string | undefined;
}

const MovieVideos = ({movieId}: Props) => {
    const [movieVideos, setMovieVideos] = useState<MovieVideoResponse>();

    useLayoutEffect(() => {
        if (!movieId) return;
        MovieDbClient.getMovieVideosDetails(movieId).then(setMovieVideos).catch(console.log);
    }, [movieId]);

    return (
        <>
            {movieVideos ? (
                    <div className="w-full grid sm:grid-cols-2 gap-2.5 mt-10">
                        {movieVideos.results.filter(x => x.site === "YouTube").map((x, i) => (
                            <iframe src={`https://www.youtube.com/embed/${x.key}`}
                                    key={i}
                                    width="100%"
                                    height={310}>
                            </iframe>
                        ))}
                    </div>
                )
                : <NoResultsTemplate/>
            }
        </>
    )
}

export default MovieVideos;