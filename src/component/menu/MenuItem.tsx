import React from 'react';
import { Link, RouteProps } from 'react-router-dom';
import { Restaurant } from '../../apis/findNearRestaurants';

const MenuItem: React.FC<Restaurant> = (restaurant) => {
    return (
        <div>
            <Link
                to={{
                    pathname: 'restaurants',
                    state: {
                        name: restaurant.name,
                        count: restaurant.count,
                    },
                }}
            >
                {restaurant.name} {restaurant.count}
            </Link>
        </div>
    );
};

export default MenuItem;
