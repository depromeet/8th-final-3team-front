import { CATEGORIES, getQuerys, MAP_API_URL } from "../utils/Constant";
import fetchData from "./fetchData";
import { Places } from "../component/App";

export interface RestaurantProps {
  restaurants: RestaurantCount[];
}

interface RestaurantCount {
  name: string;
  count: number;
}

export default function findNearRestaurants(
  latitude: number,
  longitude: number
): RestaurantProps {
  let restaurants: RestaurantCount[] = [];

  CATEGORIES.forEach((category) => {
    const query = getQuerys(latitude, longitude, category);
    fetchData<Places>(MAP_API_URL, query).then((value) => {
      if (value.documents.length > 0) {
        restaurants.push({ name: category, count: value.documents.length });
      }
    });
  });

  return { restaurants: restaurants };
}
