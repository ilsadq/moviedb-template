import {Link, useNavigate, useParams} from "react-router-dom";
import {ReactNode, useLayoutEffect, useState} from "react";
import MovieDbClient from "../../clients/MovieDbClient.ts";
import MovieDetailsResponse from "../../types/response-types/MovieDetailsResponse.ts";
import ApiEndpoints from "../../constants/ApiEndpoints.ts";
import useAsideFilterStore from "../../stores/AsideFilterStore.ts";
import defaultValues from "../../constants/DefaultValues.ts";
import LoadingTemplate from "../../components/templates/LoadingTemplate.tsx";
import NoResultsTemplate from "../../components/templates/NoResultsTemplate.tsx";
import {ArrowRightIcon} from "@heroicons/react/24/outline"
import MovieTabs from "./components/MovieTabs.tsx";

const MoviePage = () => {
    const [loadFail, setLoadFail] = useState(false);

    const [data, setData] = useState<MovieDetailsResponse>();

    const {movieId} = useParams();
    const navigate = useNavigate();
    const asideFilterStore = useAsideFilterStore();

    useLayoutEffect(() => {
        if (movieId == undefined) return navigate("/404");

        MovieDbClient.getMovieDetails({
            movieId: movieId,
            lang: asideFilterStore.translation || defaultValues.Translation
        }).then(setData).catch(() => setLoadFail(true));
    }, [movieId]);

    return (
        <PageWrapper data={data} loadFail={loadFail}>
            {data && (
                <div className="max-w-screen-lg mx-auto">
                    <div className="min-h-60 flex flex-col md:grid md:grid-cols-2 gap-5">
                        <img src={ApiEndpoints.MovieImage(data.backdrop_path)} alt="" className="rounded-xl"/>

                        <div className="flex flex-col gap-y-10 md:gap-y-2.5">
                            <h1 className="text-4xl font-bold">{data.title}</h1>
                            {data.overview ?
                                <p>{data.overview}</p>
                                :
                                <div className="flex items-center justify-center h-full">
                                    <NoResultsTemplate text="NO TRANSLATE"/>
                                </div>
                            }
                            <div className="mt-auto flex justify-end">
                                <Link to={`/movie/${movieId}/recommendation/`}
                                      className="flex items-center text-blue-500 dark:text-yellow-500 justify-center gap-x-2.5 ml-auto">
                                    Recommendation
                                    <ArrowRightIcon className="w-5 h-5"/>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <hr className="bg-white mt-10"/>

                    <div className="w-full mt-10">
                        <MovieTabs movieId={movieId}/>
                    </div>
                </div>
            )}
        </PageWrapper>
    )
}

export interface Props {
    loadFail: boolean;
    data: MovieDetailsResponse | undefined;
    children: ReactNode;
}

const PageWrapper = ({loadFail, data, children}: Props) => {
    return (
        <div className="min-h-96 flex-auto minh flex items-stretch justify-center">
            {!loadFail ? data ? <>{children}</> : <LoadingTemplate/> : <NoResultsTemplate/>}
        </div>
    )
}

export default MoviePage;