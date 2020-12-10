import React, { useEffect } from 'react';
import { RestuarantListDetail } from './RestaurantListPage';
import Pin from '../../icon/ic_pin_solid.png';

declare global {
    interface Window {
        kakao: any;
    }
}

interface KakaoMapProps {
    latitude: number;
    longitude: number;
    restaurants: RestuarantListDetail[];
}

const KakaoMap: React.FC<KakaoMapProps> = (kakaoMapProps) => {
    useEffect(() => {
        const container = document.getElementById('kakaoMap');
        const currentPositionMarker = new window.kakao.maps.LatLng(kakaoMapProps.latitude, kakaoMapProps.longitude);
        const options = {
            center: new window.kakao.maps.LatLng(kakaoMapProps.latitude, kakaoMapProps.longitude),
            level: 5,
        };
        const KakaoMap = new window.kakao.maps.Map(container, options);
        new window.kakao.maps.Marker({
            map: KakaoMap,
            position: currentPositionMarker,
        });

        kakaoMapProps.restaurants.forEach((restaurant) => {
            console.log(`${kakaoMapProps.latitude} ${kakaoMapProps.longitude}`);
            console.log(`${restaurant.placeId} ${restaurant.y} ${restaurant.x}`);

            const imageSize = new window.kakao.maps.Size(21, 21);
            const markerImage = new window.kakao.maps.MarkerImage(Pin, imageSize);

            const marker = new window.kakao.maps.Marker({
                map: KakaoMap,
                position: new window.kakao.maps.LatLng(restaurant.y, restaurant.x),
                image: markerImage,
            });

            let infowindow = new window.kakao.maps.InfoWindow({
                content: `<div>${restaurant.title}<div>`,
            });

            window.kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(KakaoMap, marker, infowindow));

            window.kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));

            function makeOverListener(map: any, marker: any, infowindow: any) {
                return function () {
                    infowindow.open(map, marker);
                };
            }

            // 인포윈도우를 닫는 클로저를 만드는 함수입니다
            function makeOutListener(infowindow: any) {
                return function () {
                    infowindow.close();
                };
            }
        });
    }, [kakaoMapProps.latitude, kakaoMapProps.longitude, kakaoMapProps.restaurants]);

    return <div id="kakaoMap" className="kakaoMap"></div>;
};

export default KakaoMap;
