interface Provider {
    logo_path: string;
    provider_id: number;
    provider_name: string;
    display_priority: number;
}

interface CountryResults {
    link: string;
    buy?: Provider[];
}

interface WatchProvidersResponse {
    id: number;
    results: {
        [countryCode: string]: CountryResults;
    };
}

export default WatchProvidersResponse;
