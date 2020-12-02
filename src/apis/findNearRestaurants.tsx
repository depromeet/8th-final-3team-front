import { CATEGORIES, makeQuery, MAP_API_URL } from '../utils/Constant';
import fetchData from './fetchData';

export interface Places {
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

export interface NextRestaurant {
    ids: number[];
}

export default async function findNearRestaurants(
    latitude: number,
    longitude: number,
    categoryIndex: number,
    page: number
): Promise<NextRestaurant> {
    const query = makeQuery(latitude, longitude, CATEGORIES[categoryIndex].name, page);
    const places = await fetchData<Places>(MAP_API_URL, query);
    const nearRestaurantIds = places.documents.map((place) => {
        return Number(place.id);
    });
    return { ids: nearRestaurantIds };
}
