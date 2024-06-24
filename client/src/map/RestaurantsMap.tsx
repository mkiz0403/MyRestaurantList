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

    const mapOptions = {
      center: new naver.maps.LatLng(37.5112, 127.0981),
      zoom: 15,
    };

    const map = new naver.maps.Map('map', mapOptions);

    // 예시로 사용자가 클릭한 위치에 마커를 추가하는 코드
    naver.maps.Event.addListener(map, 'click', function (e: any) {
      const marker = new naver.maps.Marker({
        position: e.coord,
        map: map,
      });

      // 클릭한 위치의 주소를 가져오기
      naver.maps.Service.reverseGeocode(
        {
          coords: e.coord,
        },
        function (status: any, response: any) {
          if (status === naver.maps.Service.Status.ERROR) {
            return alert('Something wrong!');
          }
          const address = response.result.items[0].address;
          console.log(`주소는 ${address} 입니다.`); // 주소를 콘솔에 출력하거나, 원하는 곳에 표시
        },
      );
    });
  }, []);
  return (
    <div
      id="map"
      style={{
        width: '70%',
        height: '800px',
        backgroundColor: 'red',
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
