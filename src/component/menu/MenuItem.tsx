import React from 'react';
import { useHistory } from 'react-router-dom';
import { RestaurantDetail } from '../../apis/findNearRestaurants';

const MenuItem: React.FC<RestaurantDetail> = (restaurant) => {
    const history = useHistory();

    return (
        <div>
            <button onClick={() => history.push(`/restaurants/${restaurant.id}`, { restaurant: restaurant })}>
                {restaurant.name} {restaurant.count}
            </button>
        </div>
    );
};

export default MenuItem;
