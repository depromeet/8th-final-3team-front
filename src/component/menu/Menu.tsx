import React from 'react';
import { Restaurant, RestaurantProps } from '../../apis/findNearRestaurants';
import MenuItem from './MenuItem';

const Menu: React.FC<RestaurantProps> = (restaurantProps) => {
    // let list: Restaurant[] = [];
    // list.push({ name: '1', count: 5 });
    // list.push({ name: '1', count: 5 });
    // list.push({ name: '1', count: 5 });
    // list.push({ name: '1', count: 5 });
    // list.push({ name: '1', count: 5 });
    // console.log(list);

    console.log(restaurantProps);
    console.log(restaurantProps.restaurants);

    return (
        <div>
            {restaurantProps.restaurants.map((restaurant) => {
                console.dir(restaurant);
                return <MenuItem name={restaurant.name} count={restaurant.count}></MenuItem>;
            })}
        </div>
    );
};

export default Menu;
