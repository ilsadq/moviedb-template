import AsideFilter from "../aside-filter/AsideFilter.tsx";
import SearchBar from "../search-bar/SearchBar.tsx";
import MovieCard from "../movie-card/MovieCard.tsx";
import {PageResult} from "../../types/PageResult.ts";
import MovieCardDetailsResponse from "../../types/response-types/MovieCardDetailsResponse.ts";
import NoResultsTemplate from "./NoResultsTemplate.tsx";
import LoadingTemplate from "./LoadingTemplate.tsx";

export interface Props {
    data?: PageResult<MovieCardDetailsResponse>;
}

const MoviesListTemplate = ({data}: Props) => {
    return (
        <div className="flex flex-col lg:grid lg:grid-cols-[320px_1fr] lg:grid-rows-[auto_1fr] flex-auto gap-y-10 gap-x-10 pb-10">
            <div className="col-start-1 col-end-2 row-start-1 row-end-3 relative">
                <AsideFilter totalPages={data?.total_pages ?? 0} totalResults={data?.total_results ?? 0}
                             className="sticky top-5 left-0 right-0"/>
            </div>
            <div className="col-start-2 col-end-3 row-start-1 row-end-2">
                <SearchBar/>
            </div>
            <div className="col-start-2 col-end-3 row-start-2 row-end-3 flex flex-col gap-y-5">
                {data ?
                    (
                        data.total_results > 0 ?
                            data.results.map((x, i) => (
                                <MovieCard model={x} key={i}/>)
                            )
                            : <NoResultsTemplate/>
                    )
                    : <LoadingTemplate/>
                }
            </div>
        </div>
    )
}

export default MoviesListTemplate;