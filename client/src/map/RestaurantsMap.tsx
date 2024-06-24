import './RestaurantsMap.css';
import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    naver: any;
  }
}

interface Restaurant {
  imageUrl: string;
  foodType: string;
  placeName: string;
  review: string;
  address: string;
  visitsCount: number;
}

interface MapProps {
  places: Restaurant[];
  selectedAddress: string | null;
}

function RestaurantsMap({ places, selectedAddress }: MapProps) {
  const mapRef = useRef<any>(null);

  useEffect(() => {
    const { naver } = window;

    if (!naver) return;

    const initMap = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          const mapOptions = {
            center: new naver.maps.LatLng(latitude, longitude),
            zoom: 18,
            zoomControlOptions: {
              position: naver.maps.Position.TOP_RIGHT,
            },
          };

          // 현재 위치 마커로 표시하기
          const map = new naver.maps.Map(mapRef.current, mapOptions);

          new naver.maps.Marker({
            position: new naver.maps.LatLng(latitude, longitude),
            map: map,
          });

          places.forEach((place) => {
            naver.maps.Service.geocode(
              {
                query: place.address,
              },
              function (status: any, response: any) {
                if (status !== naver.maps.Service.Status.OK) {
                  return alert('Something went wrong!');
                }
                const location = response.v2.addresses[0];
                const latlng = new naver.maps.LatLng(location.y, location.x);

                new naver.maps.Marker({
                  position: latlng,
                  map: map,
                  title: place.placeName,
                });
              },
            );
          });

          if (selectedAddress) {
            naver.maps.Service.geocode(
              {
                query: selectedAddress,
              },
              function (status: any, response: any) {
                if (status !== naver.maps.Service.Status.OK) {
                  return alert('Something went wrong!');
                }
                console.log(response); // 응답 객체 확인
                const location = response.v2.addresses[0];
                const latlng = new naver.maps.LatLng(location.y, location.x);

                new naver.maps.Marker({
                  position: latlng,
                  map: map,
                });
                console.log(position);
                map.setCenter(latlng);
              },
            );
          }
        },
        (error) => {
          console.error('Error getting current position:', error);
        },
      );
    };
    initMap();
  }, [places, selectedAddress]);

  return (
    <div
      ref={mapRef}
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
