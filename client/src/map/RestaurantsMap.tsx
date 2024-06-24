import './RestaurantsMap.css';
import { useEffect } from 'react';
declare global {
  interface Window {
    naver: any;
  }
}

function RestaurantsMap() {
  useEffect(() => {
    const { naver } = window;

    if (!naver) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        const mapOptions = {
          center: new naver.maps.LatLng(latitude, longitude),
          zoom: 15,
        };

        const map = new naver.maps.Map('map', mapOptions);
        // 현재 위치 마커로 표시하기
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(latitude, longitude),
          map: map,
        });

        // 예시로 사용자가 클릭한 위치에 마커를 추가하는 코드
        naver.maps.Event.addListener(map, 'click', function (e: any) {
          const marker = new naver.maps.Marker({
            position: e.coord,
            map: map,
          });
        });
      },
      (error) => {
        console.error('Error getting current position:', error);
      },
    );
  }, []);
  return (
    <div
      id="map"
      style={{
        width: '70%',
        height: '800px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h1>Map</h1>
    </div>
  );
}
export default RestaurantsMap;
