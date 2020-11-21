import React from 'react';
import { useHistory } from 'react-router-dom';
import { RestaurantDetail } from '../../apis/findNearRestaurants';
import FoodCategoryIcon from '../../icon/btn_edit.png';

const MenuItem: React.FC<RestaurantDetail> = (restaurant) => {
    const history = useHistory();

    return (
        <div className="category__buttons">
            <button onClick={() => history.push(`/restaurants/${restaurant.id}`, { restaurant: restaurant })}>
                <img className="category__buttons-icon" src={FoodCategoryIcon} alt="FoodCategoryIcon"></img>{' '}
                {restaurant.count >= 1000 ? 999 : restaurant.count}개
            </button>
        </div>
    );
};

export default MenuItem;
