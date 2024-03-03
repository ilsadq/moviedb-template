import {Combobox, Transition} from "@headlessui/react";
import {Fragment, useLayoutEffect, useState} from "react";
import MovieDbClient from "../../../clients/MovieDbClient.ts";
import {ChevronUpDownIcon} from "@heroicons/react/24/outline";
import useTranslationsStore from "../../../stores/TranslationsStore.ts";

export interface Props {
    translation: string | undefined;
    setTranslation: (value: string) => void;
}

const ComboboxTranslations = ({setTranslation, translation}: Props) => {
    const countriesStore = useTranslationsStore();

    const [query, setQuery] = useState("");

    const filteredCountries = query === ""
        ? countriesStore.translations
        : countriesStore.translations?.filter(x =>
            x.toLowerCase().includes(query.toLowerCase())
        )

    useLayoutEffect(() => {
        if (!countriesStore.translations) {
            MovieDbClient.getTranslations()
                .then(countriesStore.setTranslations)
                .catch(console.log);
        }
    }, []);

    return (
        <Combobox value={translation} onChange={setTranslation}>
            <div className="relative">
                <div className="relative w-full flex gap-x-2.5 cursor-default overflow-hidden rounded-xl bg-white dark:bg-gray-500">
                    <Combobox.Input
                        className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 dark:text-white focus:ring-0 bg-gray-200 dark:bg-gray-500"
                        placeholder="Select translation"
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
                        className="absolute mt-1 max-h-60 w-full overflow-auto rounded-xl z-50 bg-white dark:bg-gray-500 border border-blue-500 dark:border-yellow-500 text-base shadow-lg ring-1 ring-black/5 focus:outline-none">
                        {!filteredCountries || filteredCountries.length === 0 && query !== "" ?
                            (
                                <div className="relative select-none px-4 py-2 dark:text-white bg-white dark:bg-gray-500">
                                    Nothing found.
                                </div>
                            )
                            :
                            (
                                filteredCountries.map(x => (
                                    <Combobox.Option
                                        key={x}
                                        value={x}
                                        className={({active, selected}) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                active ? 'bg-blue-500 dark:bg-yellow-500' : selected ? "bg-blue-500 dark:bg-yellow-500" : 'dark:text-gray-900'
                                            }`
                                        }>
                                        {() => (
                                            <div className="dark:text-white">
                                                {x}
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

export default ComboboxTranslations;