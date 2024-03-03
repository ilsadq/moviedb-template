import {Tab} from '@headlessui/react'
import MovieVideos from "./MovieVideos.tsx";
import MovieWatchProviders from "./MovieWatchProviders.tsx";
import MovieReviews from "./MovieReviews.tsx";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export interface Props {
    movieId: string | undefined;
}

const MovieTabs = ({movieId}: Props) => {
    return (
        <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl bg-gray-300">
                <MovieTab category="Reviews"/>
                <MovieTab category="Additional links"/>
                <MovieTab category="Linked videos"/>
            </Tab.List>
            <Tab.Panels className="mt-2">
                <Tab.Panel key={0}>
                    <MovieReviews movieId={movieId}/>
                </Tab.Panel>
                <Tab.Panel key={1}>
                    <MovieWatchProviders movieId={movieId}/>
                </Tab.Panel>
                <Tab.Panel key={2}>
                    <div className="min-h-96 flex items-center justify-center">
                        <MovieVideos movieId={movieId}/>
                    </div>
                </Tab.Panel>
            </Tab.Panels>
        </Tab.Group>
    )
}

export interface TabProps {
    category: string;
}

const MovieTab = ({category}: TabProps) => {

    return (
        <Tab key={category}
             className={({selected}) =>
                 classNames(
                     'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                     selected
                         ? 'bg-blue-500 dark:bg-yellow-500 text-white dark:text-gray-500'
                         : 'text-white hover:bg-white/[0.12]'
                 )
             }
        >
            {category}
        </Tab>
    )
}

export default MovieTabs;