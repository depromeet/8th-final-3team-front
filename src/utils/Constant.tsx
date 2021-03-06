import { AxiosRequestConfig } from 'axios';
import ChinaFood from '../icon/china.png';
import JapanFood from '../icon/japan.png';
import KoreanFood from '../icon/korean.png';
import WesternFood from '../icon/western.png';
import SnackFood from '../icon/snack.png';
import AsiaFood from '../icon/asia.png';

const API_KEY = 'e098b0846d802c97d805c329d7b138d0';
export const MAP_API_URL = 'https://dapi.kakao.com/v2/local/search/keyword.json';
export const MAP_DETAIL_API_URL = 'https://amugeonago.appspot.com/api/place/';
export const ADDRESS_API_URL = 'https://dapi.kakao.com//v2/local/geo/coord2address.json';
export const BASE_URL = '8th-final-3team-front';

export const API_HEADER: AxiosRequestConfig = {
    headers: {
        Authorization: 'KakaoAK ' + API_KEY,
    },
};

interface category {
    name: string;
    icon: string;
}

export const CATEGORIES: category[] = [
    { name: '한식', icon: KoreanFood },
    { name: '중식', icon: ChinaFood },
    { name: '일식', icon: JapanFood },
    { name: '양식', icon: WesternFood },
    { name: '분식', icon: SnackFood },
    { name: '아시아 음식', icon: AsiaFood },
];

export function makeQuery(latitude: number, longitude: number, category: string, page: number = 1): string[] {
    return [`y=${latitude}`, `x=${longitude}`, 'radius=500', `query=${category}`, `page=${page}`];
}

export function makeLocationQuery(latitude: number, longitude: number) {
    return [`y=${latitude}`, `x=${longitude}`];
}
