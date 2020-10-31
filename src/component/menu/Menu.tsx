import React from 'react';
import { RestaurantProps } from '../../apis/findNearRestaurants';
import MenuItem from './MenuItem';

const Menu: React.FC<RestaurantProps> = (restaurantProps) => {
    return (
        <div>
            {restaurantProps.restaurants.map((restaurant, idx) => {
                return <MenuItem key={idx} name={restaurant.name} count={restaurant.count}></MenuItem>;
            })}
        </div>
    );
};

export default Menu;
