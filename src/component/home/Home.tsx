import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import React, { useState, useEffect } from 'react';
import findAllNearRestaurants from '../../apis/findAllNearRestaurants';
import { Place } from '../../apis/findNearRestaurants';
import Address from '../address/Address';
import Category from '../category/Category';
import Title from '../title/Title';
import Turntable from '../turntable/TurntableSix';
import WHEEL_NORMAL from '../svg/six_wheel/wheel_normal.svg';

export interface NearRestaurantProps {
    restaurants: RestaurantDetail[];
    nowLatitude: number;
    nowLongitude: number;
}

export interface RestaurantDetail {
    id: number;
    name: string;
    count: number;
    icon: string;
    nowLatitude: number;
    nowLongitude: number;
    restaurants: Place[];
}

function Home() {
    const [isSuccess, setIsSuccess] = useState(false);
    const [restaurantProps, setRestaurantProps] = useState<NearRestaurantProps>();

    useEffect(() => {
        async function getRestaurants() {
            if (!isSuccess) {
                setRestaurantProps(await findAllNearRestaurants(37.402056, 127.108212));
                setIsSuccess(true);
            }
        }
        getRestaurants();

        // navigator.geolocation.getCurrentPosition(
        //     (pos) => {
        //         async function getRestaurants() {
        //             if (!isSuccess) {
        //                 setRestaurantProps(await findNearRestaurants(pos.coords.latitude, pos.coords.longitude));
        //                 setIsSuccess(true);
        //             }
        //         }
        //         getRestaurants();
        //     },
        //     (error) => {
        //         console.log('Error Code: ' + error.code + ', Error Description: ' + error.message);
        //     },
        //     {
        //         enableHighAccuracy: false,
        //         maximumAge: 30000,
        //         timeout: 5000,
        //     }
        // );
    }, [isSuccess]);

    return (
        <div className="Home">
            <Address></Address>
            <Title></Title>
            {isSuccess ? (
                <Turntable
                    restaurants={restaurantProps!.restaurants}
                    nowLatitude={restaurantProps!.nowLatitude}
                    nowLongitude={restaurantProps!.nowLongitude}
                ></Turntable>
            ) : (
                <img src={WHEEL_NORMAL} alt="IDLE"></img>
            )}

            {isSuccess ? (
                <Category
                    restaurants={restaurantProps!.restaurants}
                    nowLatitude={restaurantProps!.nowLatitude}
                    nowLongitude={restaurantProps!.nowLongitude}
                ></Category>
            ) : (
                <CircularProgress></CircularProgress>
            )}
        </div>
    );
}

export default Home;
