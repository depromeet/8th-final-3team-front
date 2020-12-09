import React from 'react';
import { Place } from '../../apis/findNearRestaurants';
import { NearRestaurantProps } from '../home/Home';
import Menu from './Menu';

export interface MenuProps {
    id: number;
    total: number;
    icon: string;
    restaurants: Place[];
}

const Category: React.FC<NearRestaurantProps> = (restaurantProps) => {
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
                            id={restaurant.id}
                            total={restaurant.count}
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
