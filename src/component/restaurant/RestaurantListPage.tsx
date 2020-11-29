import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import fetchData from '../../apis/fetchData';
import findNearRestaurants, { RestaurantDetail } from '../../apis/findNearRestaurants';
import { MAP_DETAIL_API_URL } from '../../utils/Constant';
import KakaoMap from './KakaoMap';
import RestaurantItem from './RestaurantItem';

interface MenuProps {
    restaurant: RestaurantDetail;
}

export interface RestuarantListDetail {
    placeId: number;
    title: string;
    photo: string;
    address: string;
    zipCode: string;
    point: string;
}

interface Position {
    latitude: number;
    longitude: number;
}

interface CategoryId {
    id: string;
}

const RestaurantsListPage: React.FC = () => {
    const location = useLocation();
    const menuProps = location.state as MenuProps;

    const [restuarantListDetails, setRestuarantListDetail] = useState<RestuarantListDetail[]>([]);
    const [fetching, setFetching] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        async function getNextRestaurants(page: number) {
            setFetching(true);
            const res = await findNearRestaurants(
                menuProps.restaurant.nowLatitude,
                menuProps.restaurant.nowLongitude,
                page
            );
            console.log(res);
            setFetching(false);
        }

        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight;
            const scrollTop = document.documentElement.scrollTop;
            const clientHeight = document.documentElement.clientHeight;
            console.log(scrollHeight);
            console.log(`scrollTop + clientHeight : ${scrollTop + clientHeight}`);
            if (scrollTop + clientHeight >= scrollHeight - 200 && fetching === false) {
                // 페이지 끝에 도달하면 추가 데이터를 받아온다
                console.log('그 끝에 도달했는가?');
                // getNextRestaurants(page);
            }
        };

        async function getRestuarantListDetail() {
            const restaurants = menuProps.restaurant.restaurants.map((restaurant) => {
                return fetchData<RestuarantListDetail>(MAP_DETAIL_API_URL + restaurant.id, []);
            });
            setRestuarantListDetail(await Promise.all(restaurants));
        }
        getRestuarantListDetail();

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [
        fetching,
        menuProps.restaurant.nowLatitude,
        menuProps.restaurant.nowLongitude,
        menuProps.restaurant.restaurants,
        page,
    ]);

    // TODO : 상세 페이지 정보 얻어오는 코드 작성, CSS 작업

    return (
        <div className="header__restaurantList">
            <KakaoMap
                latitude={menuProps.restaurant.nowLatitude}
                longitude={menuProps.restaurant.nowLongitude}
            ></KakaoMap>
            <div className="header__restaurantList-detail">
                {restuarantListDetails.map((restaurantDetail) => {
                    return (
                        <RestaurantItem
                            key={restaurantDetail.placeId}
                            placeId={restaurantDetail.placeId}
                            title={restaurantDetail.title}
                            photo={restaurantDetail.photo}
                            address={restaurantDetail.address}
                            zipCode={restaurantDetail.zipCode}
                            point={restaurantDetail.point}
                        ></RestaurantItem>
                    );
                })}
            </div>
        </div>
    );
};

export default RestaurantsListPage;
