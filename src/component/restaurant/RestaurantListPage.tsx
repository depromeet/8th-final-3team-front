import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import fetchData from '../../apis/fetchData';
import findNearRestaurants, { Place } from '../../apis/findNearRestaurants';
import KakaoMap from './KakaoMap';
import RestaurantItem from './RestaurantItem';
import { MAP_DETAIL_API_URL } from '../../utils/Constant';
import { Button, withStyles } from '@material-ui/core';

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

const FloatingButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText('#FD4145'),
        fontWeight: 'bold',
        backgroundColor: '#FD4145',
        '&:hover': {
            backgroundColor: '#FD4145',
        },
        position: 'fixed',
        bottom: 50,
        width: 335,
        height: 48,
        borderRadius: 8,
        fontSize: 17,
    },
}))(Button);

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
                return fetchData<RestuarantListDetail>(MAP_DETAIL_API_URL + restaurant.id, [
                    `x=${restaurant.x}`,
                    `y=${restaurant.y}`,
                ]);
            });
            setRestuarantListDetail(await Promise.all(restaurants));
        }
        getRestuarantListDetail();
    }, [restaurantProps.restaurants]);

    const getNextRestaurants = async () => {
        setFetching(true);
        if (restuarantListDetails.length !== total) {
            setPage(page + 1);
            const nextRestaurants = await findNearRestaurants(latitude, longitude, Number(params.id), page);

            const promissedRestaurants = nextRestaurants.map((restaurant) => {
                return fetchData<RestuarantListDetail>(MAP_DETAIL_API_URL + restaurant.id, [
                    `x=${restaurant.x}`,
                    `y=${restaurant.y}`,
                ]);
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
        if (scrollTop + clientHeight >= scrollHeight - 350 && fetching === false) {
            // 페이지 끝에 도달하면 추가 데이터를 받아온다
            await getNextRestaurants();
        }
    };

    const handleRandom = () => {
        if (restuarantListDetails.length > 0) {
            const selectedReataurant = restuarantListDetails[Math.floor(Math.random() * restuarantListDetails.length)];
            return (document.location.href = `https://place.map.kakao.com/${selectedReataurant.placeId}`);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });

    return (
        <div className="header__restaurantList">
            <KakaoMap latitude={latitude} longitude={longitude} restaurants={restuarantListDetails}></KakaoMap>
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
            <div className="floating_button__wrapper">
                <FloatingButton onClick={handleRandom}>음식점도 골라주세요!</FloatingButton>
            </div>
        </div>
    );
};

export default RestaurantsListPage;
