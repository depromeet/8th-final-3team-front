import React from 'react';
import { RouteProps } from 'react-router-dom';
import { Restaurant } from '../../apis/findNearRestaurants';

const Restaurants: React.FC = (props: RouteProps) => {
    const restaurant: Restaurant = props.location!.state as Restaurant;
    console.log(restaurant);
    console.log(restaurant.name);
    return <div>선택한 음식점 종류 : {restaurant.name}</div>;
};

export default Restaurants;
