import axios from "axios";

const getQuery = (path: string, queries = []) => {
  let url = path;

  queries.forEach((element) => {});
  return url;
};

export default async function client(path: string, queries = []) {
  const query = getQuery(path, queries);
  const http = await axios.get(query);
  const jsonResult = JSON.parse(http.request.response);
  return jsonResult;
}
