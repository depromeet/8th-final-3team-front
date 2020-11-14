import React from 'react';
import { Place } from '../../apis/findNearRestaurants';

const RestaurantItem: React.FC<Place> = (restaurant) => {
    return (
        <div>
            <div>{restaurant.place_name}</div>
            <div>{restaurant.address_name}</div>
        </div>
    );
};

export default RestaurantItem;
