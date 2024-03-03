import {
    ChevronLeftIcon,
    ChevronRightIcon,
    MinusIcon,
    ChevronDoubleLeftIcon,
} from "@heroicons/react/24/outline"
import {MouseEventHandler} from "react";

export interface Props {
    onNext?: MouseEventHandler;
    onPrevious?: MouseEventHandler;
    onStart?: MouseEventHandler;
    page: number;
    totalPages: number;
}

const MPager = ({onNext, onPrevious, page, totalPages, onStart}: Props) => {
    return (
        <div className="flex items-center gap-x-2.5">
            {page > 2 &&
                <button onClick={onStart}
                        className="appearance-none w-10 h-10 rounded-xl bg-white dark:bg-gray-300 dark:text-white flex items-center justify-center">
                    <ChevronDoubleLeftIcon className="w-5 h-5"/>
                </button>
            }
            <button onClick={onPrevious}
                    className="appearance-none w-10 h-10 rounded-xl bg-white dark:bg-gray-300 dark:text-white flex items-center justify-center">
                <ChevronLeftIcon className="w-5 h-5"/>
            </button>
            <div className="flex items-center gap-x-1.5">
                {page}
                <MinusIcon className="w-5 h-5"/>
                {totalPages}
            </div>
            <button onClick={onNext}
                    className="appearance-none w-10 h-10 rounded-xl bg-white dark:bg-gray-300 dark:text-white flex items-center justify-center">
                <ChevronRightIcon className="w-5 h-5"/>
            </button>
        </div>
    )
}

export default MPager;