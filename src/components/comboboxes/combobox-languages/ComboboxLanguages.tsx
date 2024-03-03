import {Combobox, Transition} from "@headlessui/react";
import {Fragment, useLayoutEffect, useState} from "react";
import MovieDbClient from "../../../clients/MovieDbClient.ts";
import {ChevronUpDownIcon} from "@heroicons/react/24/outline";
import useLanguagesStore from "../../../stores/LanguageStore.ts";
import LanguageResponse from "../../../types/response-types/LanguageResponse.ts";

export interface Props {
    language: string | undefined;
    setLanguage: (value: string) => void;
}

const ComboboxLanguages = ({setLanguage, language}: Props) => {
    const countriesStore = useLanguagesStore();

    const [query, setQuery] = useState("");

    const filteredCountries = query === ""
        ? countriesStore.languages
        : countriesStore.languages?.filter(x =>
            x.english_name
                .toLowerCase()
                .includes(query.toLowerCase())
        )

    useLayoutEffect(() => {
        if (!countriesStore.languages) {
            MovieDbClient.getLanguages()
                .then(countriesStore.setLanguages)
                .catch(console.log);
        }
    }, []);

    return (
        <Combobox value={language} onChange={setLanguage}>
            <div className="relative">
                <div className="relative w-full flex gap-x-2.5 cursor-default overflow-hidden rounded-xl bg-gray-500">
                    <Combobox.Input
                        className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 dark:text-white focus:ring-0 bg-gray-200 dark:bg-gray-500"
                        displayValue={(language: LanguageResponse) => language.english_name}
                        placeholder="Select language"
                        onChange={(event) => setQuery(event.target.value)}
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                            className="h-5 w-5 text-blue-500 dark:text-yellow-500"
                            aria-hidden="true"
                        />
                    </Combobox.Button>
                </div>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery('')}
                >
                    <Combobox.Options
                        className="absolute mt-1 max-h-60 w-full overflow-auto rounded-xl z-50 bg-gray-500 border border-yellow-500 text-base shadow-lg ring-1 ring-black/5 focus:outline-none">
                        {!filteredCountries || filteredCountries.length === 0 && query === "" ?
                            (
                                <div className="relative select-none px-4 py-2 text-white bg-gray-500">
                                    Nothing found.
                                </div>
                            )
                            :
                            (
                                filteredCountries.map(x => (
                                    <Combobox.Option
                                        key={x.iso_639_1}
                                        value={x}
                                        className={({active, selected}) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                active ? 'bg-yellow-500' : selected ? "bg-yellow-500" : 'text-gray-900'
                                            }`
                                        }>
                                        {() => (
                                            <div className="text-white">
                                                {x.english_name}
                                            </div>
                                        )}
                                    </Combobox.Option>
                                ))
                            )
                        }
                    </Combobox.Options>
                </Transition>
            </div>
        </Combobox>
    )
}

export default ComboboxLanguages;