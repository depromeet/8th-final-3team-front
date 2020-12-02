import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import fetchData from '../../apis/fetchData';
import findNearRestaurants, { Place } from '../../apis/findNearRestaurants';
import KakaoMap from './KakaoMap';
import RestaurantItem from './RestaurantItem';
import { MAP_DETAIL_API_URL } from '../../utils/Constant';

interface RestaurantProps {
    restaurants: Place[];
}

export interface RestuarantListDetail {
    placeId: number;
    title: string;
    photo: string;
    address: string;
    scoreCnt: number;
    point: string;
    blogReviewCnt: number;
    x: number;
    y: number;
}

interface CategoryId {
    id: string;
}

const RestaurantsListPage: React.FC = () => {
    const location = useLocation();
    const params = useParams() as CategoryId;
    const restaurantProps = location.state as RestaurantProps;
    const queryString = new URLSearchParams(location.search);
    const latitude = Number(queryString.get('latitude'));
    const longitude = Number(queryString.get('longitude'));
    const total = Number(queryString.get('total'));

    const [restuarantListDetails, setRestuarantListDetail] = useState<RestuarantListDetail[]>([]);
    const [fetching, setFetching] = useState(false);
    const [page, setPage] = useState(2);

    useEffect(() => {
        async function getRestuarantListDetail() {
            const restaurants = restaurantProps.restaurants.map((restaurant) => {
                return fetchData<RestuarantListDetail>(MAP_DETAIL_API_URL + restaurant.id, []);
            });
            setRestuarantListDetail(await Promise.all(restaurants));
        }
        getRestuarantListDetail();
    }, [restaurantProps.restaurants]);

    const getNextRestaurants = async () => {
        setFetching(true);
        console.log(page);
        if (restuarantListDetails.length !== total) {
            setPage(page + 1);
            const nextRestaurantIds = await findNearRestaurants(latitude, longitude, Number(params.id), page);

            const promissedRestaurants = nextRestaurantIds.ids.map((id) => {
                return fetchData<RestuarantListDetail>(MAP_DETAIL_API_URL + id, []);
            });
            const addedRestaurants = await Promise.all(promissedRestaurants);
            setRestuarantListDetail(restuarantListDetails.concat(addedRestaurants));
        }
        setFetching(false);
    };

    const handleScroll = async () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        if (scrollTop + clientHeight >= scrollHeight - 300 && fetching === false) {
            // 페이지 끝에 도달하면 추가 데이터를 받아온다
            await getNextRestaurants();
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });

    // TODO : 상세 페이지 정보 얻어오는 코드 작성, CSS 작업

    return (
        <div className="header__restaurantList">
            <KakaoMap latitude={latitude} longitude={longitude}></KakaoMap>
            <div className="header__restaurantList-detail">
                {restuarantListDetails.map((restaurantDetail, index) => {
                    return (
                        <RestaurantItem
                            key={index}
                            placeId={restaurantDetail.placeId}
                            title={restaurantDetail.title}
                            photo={restaurantDetail.photo}
                            address={restaurantDetail.address}
                            scoreCnt={restaurantDetail.scoreCnt}
                            blogReviewCnt={restaurantDetail.blogReviewCnt}
                            point={restaurantDetail.point}
                            x={restaurantDetail.x}
                            y={restaurantDetail.y}
                        ></RestaurantItem>
                    );
                })}
            </div>
        </div>
    );
};

export default RestaurantsListPage;
