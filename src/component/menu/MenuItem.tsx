import React from 'react';
import { Restaurant } from '../../apis/findNearRestaurants';

const MenuItem: React.FC<Restaurant> = (name, count) => {
    console.log(name);
    console.log(count);
    return (
        <div>
            아이템
            {name} {count}
        </div>
    );
};

export default MenuItem;
