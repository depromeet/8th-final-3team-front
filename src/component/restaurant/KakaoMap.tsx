import React, { useEffect } from 'react';

declare global {
    interface Window {
        kakao: any;
    }
}

interface CurrentLocation {
    latitude: number;
    longitude: number;
}

const KakaoMap: React.FC<CurrentLocation> = (location) => {
    useEffect(() => {
        const container = document.getElementById('kakaoMap');
        const currentPositionMarker = new window.kakao.maps.LatLng(location.latitude, location.longitude);
        const options = {
            center: new window.kakao.maps.LatLng(location.latitude, location.longitude),
            level: 3,
        };
        const KakaoMap = new window.kakao.maps.Map(container, options);
        const marker = new window.kakao.maps.Marker({
            position: currentPositionMarker,
        });
        marker.setMap(KakaoMap);
    }, [location.latitude, location.longitude]);

    return <div id="kakaoMap" className="kakaoMap"></div>;
};

export default KakaoMap;
