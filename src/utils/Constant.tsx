import { AxiosRequestConfig } from "axios";
import { KeyPairSyncResult } from "crypto";

const API_KEY = "e098b0846d802c97d805c329d7b138d0";
export const MAP_API_URL = "https://dapi.kakao.com";

export const API_HEADER: AxiosRequestConfig = {
  headers: {
    Authorization: "KakaoAK " + API_KEY,
  },
};
