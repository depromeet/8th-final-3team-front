import CircularProgress from '@material-ui/core/CircularProgress';
import React, { useState, useEffect } from 'react';
import findNearRestaurants, { RestaurantProps } from '../apis/findNearRestaurants';
import Menu from './menu/Menu';

export interface TurntableProps {
    prize: string[];
}

export interface Place {
    address_name: string;
    category_group_code: string;
    category_group_name: string;
    category_name: string;
    distance: string;
    id: string;
    phone: string;
    place_name: string;
    place_url: string;
    road_address_name: string;
    x: string;
    y: string;
}

export interface SameName {
    keyword: string;
    region: any[];
    selected_region: string;
}

export interface Meta {
    is_end: boolean;
    pageable_count: number;
    same_name: SameName;
    total_count: number;
}

export interface Places {
    documents: Place[];
    meta: Meta;
}

function App() {
    const [isSuccess, setIsSuccess] = useState(false);
    const [restaurantProps, setRestaurantProps] = useState<RestaurantProps>();

    const positionOptions = {
        enableHighAccuracy: false,
        maximumAge: 0,
        timeout: 500,
    };

    useEffect(async () => {
        if (!isSuccess) {
            setRestaurantProps(await findNearRestaurants(37.402056, 127.108212));
            setIsSuccess(true);
        }
        // navigator.geolocation.getCurrentPosition(
        //     (pos) => {
        //         if (!isSuccess) {
        //             setRestaurantProps(findNearRestaurants(pos.coords.latitude, pos.coords.longitude));
        //             setIsSuccess(true);
        //         }
        //     },
        //     (error) => {
        //         console.log('Error Code: ' + error.code + ', Error Description: ' + error.message);
        //     },
        //     positionOptions
        // );
    }, [isSuccess, positionOptions, restaurantProps]);

    return (
        <div className="App">
            {isSuccess ? (
                <Menu restaurants={restaurantProps!.restaurants}></Menu>
            ) : (
                <CircularProgress></CircularProgress>
            )}
        </div>
    );
}

export default App;
