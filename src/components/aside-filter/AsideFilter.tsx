import MDisclosure from "../disclosure/MDisclosure.tsx";
import MPager from "../pager/MPager.tsx";
import ComboboxCountries from "../comboboxes/combobox-countries/ComboboxCountries.tsx";
import ComboboxTranslations from "../comboboxes/combobox-translations/ComboboxTranslations.tsx";
import useAsideFilterStore from "../../stores/AsideFilterStore.ts";

export interface Props {
    className?: string;
    totalPages: number;
    totalResults: number;
}

const AsideFilter = ({className, totalPages, totalResults}: Props) => {
    const asideFilterStore = useAsideFilterStore();

    const isOpenFilter: boolean = !!(asideFilterStore.translation || asideFilterStore.language || asideFilterStore.country);

    const nextClickHandler = () => {
        asideFilterStore.setPage(
            asideFilterStore.page + 1 <= totalPages
                ? asideFilterStore.page + 1
                : asideFilterStore.page
        );
    }

    const previousClickHandler = () => {
        asideFilterStore.setPage(
            asideFilterStore.page - 1 > 0
                ? asideFilterStore.page - 1
                : asideFilterStore.page
        )
    }

    const startClickHandler = () => {
        asideFilterStore.setPage(1);
    }

    return (
        <aside className={"flex flex-col gap-y-5 w-full " + className}>
            <MDisclosure title="Filter" opened={isOpenFilter}>
                <div className="flex flex-col gap-y-5">
                    <ComboboxCountries country={asideFilterStore.country} setCountry={asideFilterStore.setCountry}/>
                    <ComboboxTranslations translation={asideFilterStore.translation}
                                          setTranslation={asideFilterStore.setTranslation}/>
                    <button onClick={asideFilterStore.resetFilter}
                            className="w-full h-10 rounded-xl bg-blue-500 text-white dark:text-gray-900 dark:bg-yellow-500 mt-5">
                        Reset
                    </button>
                </div>
            </MDisclosure>
            <div className="flex">
                Total results: {totalResults}
            </div>
            {totalPages > 1 &&
                <MPager page={asideFilterStore.page}
                        totalPages={totalPages}
                        onNext={nextClickHandler}
                        onPrevious={previousClickHandler}
                        onStart={startClickHandler}
                />
            }
        </aside>
    )
}

export default AsideFilter;