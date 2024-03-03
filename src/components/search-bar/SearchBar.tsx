import {MagnifyingGlassIcon} from "@heroicons/react/24/outline"
import {FormEvent, useLayoutEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import useAsideFilterStore from "../../stores/AsideFilterStore.ts";
import DefaultValues from "../../constants/DefaultValues.ts";

export interface Props {
    onSubmit: FormEvent<HTMLFormElement>;
}

const SearchBar = () => {
    const [value, setValue] = useState("");
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const asideFilterStore = useAsideFilterStore();

    useLayoutEffect(() => {
        const search = searchParams.get("search");
        if (search) setValue(search);
    }, [searchParams]);

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        asideFilterStore.setPage(DefaultValues.Page);
        navigate({
            pathname: "/search",
            search: new URLSearchParams([["search", value]]).toString()
        });
    }

    return (
        <form onSubmit={submitHandler} className="flex items-stretch flex-col sm:flex-row sm:h-12 gap-5">
            <div className="flex items-center w-full bg-white dark:bg-gray-300 rounded-xl h-full py-2.5 px-4 gap-x-2.5">
                <button type="submit">
                    <MagnifyingGlassIcon className="w-6 h-6"/>
                </button>
                <input placeholder="Enter movie"
                       value={value}
                       name="search"
                       onChange={e => setValue(e.target.value)}
                       className="w-full h-full text-lg bg-transparent px-2.5 outline-none dark:text-white border-0"/>
            </div>
            <button type="submit" className="w-full sm:w-auto sm:min-w-52 bg-white dark:bg-gray-300 h-12 rounded-xl font-medium text-lg">
                Search
            </button>
        </form>
    )
}

export default SearchBar;