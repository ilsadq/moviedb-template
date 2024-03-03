import {Disclosure} from "@headlessui/react";
import {ChevronUpIcon} from "@heroicons/react/24/solid";
import {FunnelIcon} from "@heroicons/react/24/outline";
import {ReactElement} from "react";

export interface Props {
    children: ReactElement;
    title: string;
    className?: string;
    opened?: boolean;
}

const MDisclosure = ({children, title, className, opened = false}: Props) => {
    return (
        <Disclosure as="div" defaultOpen={opened}>
            {({open}) => (
                <div className={"bg-white dark:bg-gray-300 rounded-xl flex items-stretch flex-col " + className}>
                    <Disclosure.Button className="rounded flex items-center justify-between gap-x-2.5 w-full px-4 min-h-12">
                        <div className="flex items-center gap-x-4">
                            <FunnelIcon className="w-5 h-5 dark:text-white"/>
                            <div className="text-lg font-medium">{title}</div>
                        </div>
                        <ChevronUpIcon className={`${open ? "rotate-180 transform" : ""} h-5 w-5 dark:text-white`}/>
                    </Disclosure.Button>
                    <Disclosure.Panel className="dark:text-white py-2.5 px-4">
                        {children}
                    </Disclosure.Panel>
                </div>
            )}
        </Disclosure>
    )
}

export default MDisclosure;