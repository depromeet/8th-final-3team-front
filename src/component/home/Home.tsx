import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import React, { useState, useEffect } from 'react';
import findNearRestaurants, { RestaurantProps } from '../../apis/findNearRestaurants';
import Address from '../address/Address';
import Category from '../category/Category';
import Title from '../title/Title';
import Turntable from '../turntable/TurntableSix';

function Home() {
    const [isSuccess, setIsSuccess] = useState(false);
    const [restaurantProps, setRestaurantProps] = useState<RestaurantProps>();

    useEffect(() => {
        async function getRestaurants() {
            if (!isSuccess) {
                setRestaurantProps(await findNearRestaurants(37.402056, 127.108212));
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
            <Turntable></Turntable>
            {isSuccess ? (
                <Category restaurants={restaurantProps!.restaurants}></Category>
            ) : (
                <CircularProgress></CircularProgress>
            )}
        </div>
    );
}

export default Home;
