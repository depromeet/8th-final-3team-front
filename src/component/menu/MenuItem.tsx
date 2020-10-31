import React from 'react';
import { Restaurant } from '../../apis/findNearRestaurants';

const MenuItem: React.FC<Restaurant> = (restaurant) => {
    return (
        <div>
            {restaurant.name} {restaurant.count}
        </div>
    );
};

export default MenuItem;
