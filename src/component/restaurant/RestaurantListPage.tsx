import React from 'react';
import { useLocation } from 'react-router-dom';
import fetchData from '../../apis/fetchData';
import { RestaurantDetail } from '../../apis/findNearRestaurants';
import { MAP_DETAIL_API_URL } from '../../utils/Constant';
import KakaoMap from './KakaoMap';
import RestaurantItem from './RestaurantItem';

interface MenuProps {
    restaurant: RestaurantDetail;
}

interface RestuarantListDetail {
    placeId: number;
    title: string;
    photo: string;
    address: string;
    zipCode: string;
    point: string;
}

const RestaurantsListPage: React.FC = () => {
    const location = useLocation();
    const menuProps = location.state as MenuProps;

    // TODO : 상세 페이지 정보 얻어오는 코드 작성, CSS 작업
    const list = menuProps.restaurant.restaurants.map((restaurant) => {
        return fetchData(MAP_DETAIL_API_URL + restaurant.id, []);
    });
    const datas = Promise.all(list).then((res) => {
        // console.log(res);
    });
    // console.dir(datas);

    return (
        <div>
            <KakaoMap
                latitude={menuProps.restaurant.nowLatitude}
                longitude={menuProps.restaurant.nowLongitude}
            ></KakaoMap>
            {menuProps.restaurant.restaurants.map((restaurant) => {
                return (
                    <RestaurantItem
                        key={restaurant.id}
                        address_name={restaurant.address_name}
                        category_group_code={restaurant.category_group_code}
                        category_group_name={restaurant.category_group_name}
                        category_name={restaurant.category_name}
                        distance={restaurant.distance}
                        id={restaurant.id}
                        phone={restaurant.phone}
                        place_name={restaurant.place_name}
                        place_url={restaurant.place_url}
                        road_address_name={restaurant.road_address_name}
                        x={restaurant.x}
                        y={restaurant.y}
                    ></RestaurantItem>
                );
            })}
        </div>
    );
};

export default RestaurantsListPage;
