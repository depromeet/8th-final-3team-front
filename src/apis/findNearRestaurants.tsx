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
    let restaurants: Restaurant[] = [];

    CATEGORIES.forEach(async (category) => {
        const query = makeQuery(latitude, longitude, category);
        const value = await fetchData<Places>(MAP_API_URL, query);
        if (value.documents.length > 0) {
            restaurants.push({ name: category, count: value.documents.length });
        }
    });

    return { restaurants: restaurants };
}
