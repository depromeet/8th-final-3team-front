import { CATEGORIES, makeQuery, MAP_API_URL } from '../utils/Constant';
import fetchData from './fetchData';
import { Places } from '../component/App';

export interface RestaurantProps {
    restaurants: Restaurant[];
}
export interface Restaurant {
    name: string;
    count: number;
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
