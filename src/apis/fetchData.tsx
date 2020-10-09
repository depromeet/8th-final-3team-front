import axios from "axios";
import { API_HEADER } from "../utils/Constant";

const getQuery = (path: string, queries: string[]) => {
  let url = path;

  if (queries.length > 0) {
    url += "?";

    queries.forEach((query) => {
      url += "&" + query;
    });
  }
  return url;
};

export default async function fetchData<T>(path: string, queries: string[]) {
  const query = getQuery(path, queries);
  const http = await axios.get(query, API_HEADER);
  const jsonResult = JSON.parse(http.request.response) as T;
  return jsonResult;
}
