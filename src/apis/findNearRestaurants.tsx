import { CATEGORIES, getQuerys, MAP_API_URL } from "../utils/Constant";
import fetchData from "./fetchData";
import { Places } from "../component/App";

export default function findNearRestaurants(
  latitude: number,
  longitude: number
) {
  CATEGORIES.forEach((category) => {
    const query = getQuerys(latitude, longitude, category);
    const result = fetchData<Places>(MAP_API_URL, query).then((value) => {
      console.log(value);
      console.log(value.documents[0].address_name);
      console.log(value.documents.length);
    });
  });
}
