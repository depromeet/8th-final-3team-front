import { CATEGORIES, makeQuery, MAP_API_URL } from '../utils/Constant';
import fetchData from './fetchData';
import { NearRestaurantProps, Places, RestaurantDetail } from './findNearRestaurants';

export default async function findAllNearRestaurants(
    latitude: number,
    longitude: number
): Promise<NearRestaurantProps> {
    const places = CATEGORIES.map((category) => {
        const query = makeQuery(latitude, longitude, category.name);
        return fetchData<Places>(MAP_API_URL, query);
    });

    const responses = await Promise.all(places);
    const restaurants: RestaurantDetail[] = responses.map((res, idx) => {
        return {
            id: idx,
            name: CATEGORIES[idx].name,
            count: res.meta.total_count,
            icon: CATEGORIES[idx].icon,
            nowLatitude: latitude,
            nowLongitude: longitude,
            restaurants: res.documents,
        };
    });

    return { restaurants: restaurants, nowLatitude: latitude, nowLongitude: longitude };
}
