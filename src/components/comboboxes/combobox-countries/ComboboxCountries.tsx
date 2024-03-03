import {Combobox, Transition} from "@headlessui/react";
import useCountriesStore from "../../../stores/CountriesStore.ts";
import {Fragment, useLayoutEffect, useState} from "react";
import MovieDbClient from "../../../clients/MovieDbClient.ts";
import {ChevronUpDownIcon} from "@heroicons/react/24/outline";
import {CountryResponse} from "../../../types/response-types/CountryResponse.ts";

export interface Props {
    country: string | undefined;
    setCountry: (value: string) => void;
}

const ComboboxCountries = ({setCountry, country}: Props) => {
    const countriesStore = useCountriesStore();

    const [query, setQuery] = useState("");

    const filteredCountries = query === ""
        ? countriesStore.countries
        : countriesStore.countries?.filter(x =>
            x.english_name
                .toLowerCase()
                .includes(query.toLowerCase())
        )

    useLayoutEffect(() => {
        if (!countriesStore.countries) {
            MovieDbClient.getCountries()
                .then(countriesStore.setCountries)
                .catch(console.log);
        }
    }, []);

    return (
        <Combobox value={country} onChange={setCountry}>
            <div className="relative">
                <div className="relative w-full flex gap-x-2.5 cursor-default overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-500">
                    <Combobox.Input
                        className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 dark:text-white focus:ring-0 bg-gray-200 dark:bg-gray-500"
                        displayValue={(country: CountryResponse) => country.english_name}
                        placeholder="Select country"
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
                        className="absolute mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white dark:bg-gray-500 border z-50 border-blue-500 dark:border-yellow-500 text-base shadow-lg ring-1 ring-black/5 focus:outline-none">
                        {!filteredCountries || filteredCountries.length === 0 && query !== "" ?
                            (
                                <div className="relative h-10 select-none px-4 py-2 dark:text-white bg-white dark:bg-gray-500">
                                    Nothing found.
                                </div>
                            )
                            :
                            (
                                filteredCountries.map(x => (
                                    <Combobox.Option
                                        key={x.iso_3166_1}
                                        value={x}
                                        className={({active, selected}) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                active ? 'bg-blue-500 dark:bg-yellow-500' : selected ? "bg-blue-500 dark:bg-yellow-500" : 'text-gray-900'
                                            }`
                                        }>
                                        {() => (
                                            <div className="dark:text-white">
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

export default ComboboxCountries;