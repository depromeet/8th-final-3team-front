import React from 'react';
import { RestuarantListDetail } from './RestaurantListPage';
import Star from '../../icon/star1@3x.png';
import Ryan from '../../icon/Ryan.png';

const RestaurantItem: React.FC<RestuarantListDetail> = (restaurant) => {
    const handleOnClick = () => {
        return (document.location.href = `https://place.map.kakao.com/${restaurant.placeId}`);
    };
    return (
        <div className="restaurant__list" onClick={handleOnClick}>
            <div className="restaurant__list-text">
                <h1>{restaurant.title}</h1>
                <div className="restaurant__list-detail">
                    <img src={Star} alt="star"></img>
                    <h1>{restaurant.point}</h1>
                </div>
                <h2>{restaurant.address}</h2>
            </div>
            <div className="restaurant__list-img">
                {typeof restaurant.photo !== 'undefined' ? (
                    <img src={restaurant.photo} alt="restaurant_icon"></img>
                ) : (
                    <img src={Ryan} alt="restaurant_icon"></img>
                )}
            </div>
        </div>
    );
};

export default RestaurantItem;
