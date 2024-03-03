import {useLayoutEffect, useState} from "react";
import MovieDbClient from "../../../clients/MovieDbClient.ts";
import MovieReviewsResponse from "../../../types/response-types/MovieReviewsResponse.ts";
import {PageResult} from "../../../types/PageResult.ts";
import DefaultValues from "../../../constants/DefaultValues.ts";
import MPager from "../../../components/pager/MPager.tsx";
import NoResultsTemplate from "../../../components/templates/NoResultsTemplate.tsx";
import ApiEndpoints from "../../../constants/ApiEndpoints.ts";
import StarRating from "../../../components/star-rating/StarRating.tsx";
import parse from 'html-react-parser';

export interface Props {
    movieId: string | undefined;
}

const MovieReviews = ({movieId}: Props) => {
    const [data, setData] = useState<PageResult<MovieReviewsResponse>>();
    const [page, setPage] = useState(DefaultValues.Page);

    useLayoutEffect(() => {
        if (!movieId) return;

        MovieDbClient.getMovieReviews({
            movie_id: movieId,
            page: page,
            language: "en-US"
        }).then(setData).catch(console.log);
    }, [movieId, page]);

    const startClickHandler = () => {
        setPage(DefaultValues.Page);
    }

    const previousClickHandler = () => {
        setPage(prev => prev - 1 > 0 ? prev - 1 : prev);
    }

    const nextClickHandler = () => {
        setPage(prev => prev + 1 <= (data?.total_pages ?? 0) ? prev + 1 : prev);
    }

    return (
        <div className="flex flex-col gap-y-10 pb-20">
            <div className="mt-10">
                {data && data.total_pages > DefaultValues.Page && (
                    <div className="flex items-center justify-end bg-white dark:bg-gray-300 rounded-xl p-2.5">
                        <MPager page={page}
                                totalPages={data?.total_pages ?? 0}
                                onStart={startClickHandler}
                                onPrevious={previousClickHandler}
                                onNext={nextClickHandler}
                        />
                    </div>
                )}
            </div>
            <div className="flex flex-col items-stretch justify-start gap-y-10 w-full h-full">
                {data?.results && data.results.length !== 0 ?
                    (
                        data.results.map(x => (
                            <div key={x.id}>
                                <div className="flex flex-col sm:grid sm:grid-cols-[auto_1fr] gap-5 w-full">
                                    <div>
                                        <div className="flex items-start gap-x-2.5 bg-white dark:bg-gray-300 p-2.5 rounded-xl min-w-60 w-full">
                                            {x.author_details.avatar_path ?
                                                <img src={ApiEndpoints.MovieImage(x.author_details.avatar_path)}
                                                     alt={x.author_details.username}
                                                     className="min-w-10 min-h-10 max-w-10 max-h-10 rounded-full"
                                                />
                                                :
                                                <div
                                                    className="min-w-10 min-h-10 max-w-10 max-h-10 rounded-full bg-gray-200 dark:bg-gray-500"
                                                />
                                            }
                                            <div>
                                                <div
                                                    className="line-clamp-none">{x.author_details.username}</div>
                                                <div className="text-sm text-gray-400">{x.author}</div>
                                                <div className="mt-2.5 pointer-events-none">
                                                    <StarRating value={x.author_details.rating}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div></div>
                                    </div>
                                    <div className="whitespace-pre-wrap">{parse(x.content)}</div>
                                </div>
                                <hr className="bg-white mt-5"/>
                            </div>
                        ))
                    )
                    :
                    (
                        <div className="min-h-96 flex items-center justify-start">
                            <NoResultsTemplate/>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default MovieReviews;