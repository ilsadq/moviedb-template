import {StarIcon} from "@heroicons/react/24/solid"

export interface Props {
    value: number;
}

const StarRating = ({value}: Props) => {
    const color = (index: number) => (index <= Math.floor(value / 2) ? "text-yellow-300" : "text-gray-200 dark:text-gray-500");

    return (
        <div className={"flex items-center gap-x-2.5 "}>
            {[...Array(5)].map((_, i) => (
                <button key={i} className={"appearance-none inline-block cursor-pointer " + color(i)}>
                    <StarIcon className="w-10 md:w-5 h-10 md:h-5"/>
                </button>
            ))}
        </div>
    )
}

export default StarRating;