import React from 'react';
import { RestaurantProps } from '../../apis/findNearRestaurants';
import Menu from './Menu';

const Category: React.FC<RestaurantProps> = (restaurantProps) => {
    return (
        <div className="category">
            <div className="cageory__title-text">
                <h2>카테고리</h2>
                <h3>도보 10분 이내</h3>
            </div>
            <div className="category__buttons">
                {restaurantProps.restaurants.map((restaurant, idx) => {
                    return (
                        <Menu
                            key={idx}
                            id={idx}
                            name={restaurant.name}
                            count={restaurant.count}
                            icon={restaurant.icon}
                            restaurants={restaurant.restaurants}
                        ></Menu>
                    );
                })}
            </div>
        </div>
    );
};

export default Category;
