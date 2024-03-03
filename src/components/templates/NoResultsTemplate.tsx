export interface Props {
    text?: string;
}

const NoResultsTemplate = ({text}: Props) => {
    return (
        <div className="min-w-full min-h-full flex items-center justify-center">
            <h1 className="font-black text-6xl text-white dark:text-gray-300 rotate-6 select-none pointer-events-none">
                {text ?? "No results"}
            </h1>
        </div>
    )
}

export default NoResultsTemplate;