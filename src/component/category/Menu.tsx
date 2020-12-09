import React from 'react';
import { useHistory } from 'react-router-dom';
import { useContextState } from '../context/Context';
import { MenuProps } from './Category';

const MenuItem: React.FC<MenuProps> = (restaurantProps) => {
    const history = useHistory();
    const state = useContextState();

    return (
        <div>
            <button
                className="category__button"
                onClick={() =>
                    history.push(
                        `/restaurants/${restaurantProps.id}?latitude=${state.latitude}&longitude=${state.longitude}&total=${restaurantProps.total}`,
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
