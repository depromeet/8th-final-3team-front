import React from 'react';
import { useHistory } from 'react-router-dom';
import { RestaurantDetail } from '../../apis/findNearRestaurants';

const MenuItem: React.FC<RestaurantDetail> = (restaurant) => {
    const history = useHistory();

    return (
        <div>
            <button
                className="category__button"
                onClick={() => history.push(`/restaurants/${restaurant.id}`, { restaurant: restaurant })}
            >
                <img className="category__button-icon" src={restaurant.icon} alt="FoodCategoryIcon"></img>
                {restaurant.count >= 1000 ? 999 : restaurant.count}개
            </button>
        </div>
    );
};

export default MenuItem;
