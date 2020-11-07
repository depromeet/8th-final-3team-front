import { CATEGORIES, makeQuery, MAP_API_URL } from '../utils/Constant';
import fetchData from './fetchData';

export interface RestaurantProps {
    restaurants: Restaurant[];
}
export interface Restaurant {
    name: string;
    count: number;
}

interface Places {
    documents: Place[];
    meta: Meta;
}

export interface Place {
    address_name: string;
    category_group_code: string;
    category_group_name: string;
    category_name: string;
    distance: string;
    id: string;
    phone: string;
    place_name: string;
    place_url: string;
    road_address_name: string;
    x: string;
    y: string;
}

export interface SameName {
    keyword: string;
    region: any[];
    selected_region: string;
}

export interface Meta {
    is_end: boolean;
    pageable_count: number;
    same_name: SameName;
    total_count: number;
}


export default async function findNearRestaurants(latitude: number, longitude: number): Promise<RestaurantProps> {
    const places = CATEGORIES.map((category) => {
        const query = makeQuery(latitude, longitude, category);
        return fetchData<Places>(MAP_API_URL, query);
    });

    const responses = await Promise.all(places);
    const restaurants: Restaurant[] = responses.map((res, idx) => {
        return { name: CATEGORIES[idx], count: res.documents.length };
    });

    return { restaurants };
}
