import { AxiosRequestConfig } from "axios";

const API_KEY = "e098b0846d802c97d805c329d7b138d0";
export const MAP_API_URL = "https://dapi.kakao.com/v2/local/search/keyword.json";

export const API_HEADER: AxiosRequestConfig = {
  headers: {
    Authorization: "KakaoAK " + API_KEY,
  },
};

export const CATEGORIES = ["한식", "중식", "양식", "일식", "분식"];

export function getQuerys(latitude:number, longitude:number, category:string):string[] {
  return [`y=${latitude}`,`x=${longitude}`,"radius=20000", `query=${category}`];
} 
