import {Link} from "react-router-dom";
import ApiEndpoints from "../../constants/ApiEndpoints.ts";
import StarRating from "../star-rating/StarRating.tsx";
import MovieCardDetailsResponse from "../../types/response-types/MovieCardDetailsResponse.ts";

export interface Props {
    model: MovieCardDetailsResponse;
}

const MovieCard = ({model}: Props) => {
    const movieUrl = "/movie/" + model.id;

    return (
        <article className="bg-white dark:bg-gray-300 h-min md:h-64 w-full rounded-xl p-2.5 flex flex-col md:flex-row items-stretch gap-x-4">
            <Link to={movieUrl} className="contents">
                <img src={ApiEndpoints.MovieImage(model.poster_path)} alt=""
                     className="aspect-4/4 inline-block rounded-lg w-full md:w-auto"/>
            </Link>

            <div className="w-full h-full flex flex-col gap-y-2.5 relative">
                <div className="hidden md:flex items-start justify-between gap-x-2.5">
                    <h4 className="font-medium text-lg">
                        <Link to={movieUrl} className="hover:underline">{model.title}</Link>
                    </h4>
                    <span className="text-gray-500 dark:text-gray-200 text-sm">{model.release_date}</span>
                </div>
                {model.overview &&
                    <p className="text-sm hidden md:inline-block">{model.overview}</p>
                    ||
                    <div className="hidden md:flex items-center justify-center h-full">
                        <span className="text-gray-200 dark:text-gray-500 rotate-6 font-black text-5xl select-none pointer-events-none">NO TRANSLATE</span>
                    </div>
                }

                <div className="mt-auto flex justify-center md:justify-end gap-x-5 items-center md:items-end text-sm py-5 md:py-0">
                    {model.vote_count}
                    <StarRating value={model.vote_average}/>
                </div>
            </div>
        </article>
    )
}

export default MovieCard;