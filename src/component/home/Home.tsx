import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import React, { useState, useEffect } from 'react';
import findAllNearRestaurants from '../../apis/findAllNearRestaurants';
import { Place } from '../../apis/findNearRestaurants';
import Address from '../address/Address';
import Category from '../category/Category';
import Title from '../title/Title';
import Turntable from '../turntable/TurntableSix';
import WHEEL_NORMAL from '../svg/six_wheel/wheel_normal.svg';
import ROULETTE_BUTTON from '../../icon/roulette_button.png';
import findAddress, { AddressResponse } from '../../apis/findAddress';

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
    const [address, setAddress] = useState<AddressResponse>();
    const [restaurantProps, setRestaurantProps] = useState<NearRestaurantProps>();

    useEffect(() => {
        async function getRestaurants() {
            if (!isSuccess) {
                setAddress(await findAddress(37.402056, 127.108212));
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
            {isSuccess ? (
                <Address meta={address!.meta} address={address!.address} roadAddress={address!.roadAddress}></Address>
            ) : (
                <div>검색 중..</div>
            )}
            <Title></Title>
            {isSuccess ? (
                <Turntable
                    restaurants={restaurantProps!.restaurants}
                    nowLatitude={restaurantProps!.nowLatitude}
                    nowLongitude={restaurantProps!.nowLongitude}
                ></Turntable>
            ) : (
                <div className="turntable">
                    <img src={WHEEL_NORMAL} alt="IDLE"></img>
                    <img className="roulette_button" src={ROULETTE_BUTTON} width="88" alt="roulette_button" />
                </div>
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
