import React from 'react';
import { useHistory } from 'react-router-dom';
import { MenuProps } from './Category';

const MenuItem: React.FC<MenuProps> = (restaurantProps) => {
    const history = useHistory();

    return (
        <div>
            <button
                className="category__button"
                onClick={() =>
                    history.push(
                        `/restaurants/${restaurantProps.id}?latitude=${restaurantProps.nowLatitude}&longitude=${restaurantProps.nowLongitude}&total=${restaurantProps.total}`,
                        { restaurants: restaurantProps.restaurants }
                    )
                }
            >
                <img className="category__button-icon" src={restaurantProps.icon} alt="FoodCategoryIcon"></img>
                {restaurantProps.total >= 1000 ? 999 : restaurantProps.total}개
            </button>
        </div>
    );
};

export default MenuItem;
