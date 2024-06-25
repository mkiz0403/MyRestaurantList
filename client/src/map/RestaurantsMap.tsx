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
            zoom: 16,
            zoomControl: true,
            zoomControlOptions: {
              style: naver.maps.ZoomControlStyle.LARGE,
              position: naver.maps.Position.TOP_RIGHT,
            },
          };

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

                const marker = new naver.maps.Marker({
                  position: latlng,
                  map: map,
                  title: place.placeName,
                });
                const infoWindow = new naver.maps.InfoWindow({
                  content: [
                    '<div style="padding: 10px; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 16px 0px;">',
                    `   <div style="font-weight: bold; margin-bottom: 5px;">${place.placeName}</div>`,
                    `   <div style="font-size: 13px;">${place.review}<div>`,
                    '</div>',
                  ].join(''),
                  maxWidth: 300,
                  anchorSize: {
                    width: 12,
                    height: 14,
                  },
                  borderColor: '#cecdc7',
                });

                naver.maps.Event.addListener(marker, 'click', () => {
                  if (infoWindow.getMap()) {
                    infoWindow.close();
                  } else {
                    infoWindow.open(map, marker);
                  }
                });
              },
            );
          });

          if (selectedAddress) {
            const selectedPlace = places.find((place) => place.address === selectedAddress);
            const selectedTitle = selectedPlace ? selectedPlace.placeName : '정보 없음';
            const selectedReview = selectedPlace ? selectedPlace.review : '정보 없음';

            naver.maps.Service.geocode(
              {
                query: selectedAddress,
              },
              function (status: any, response: any) {
                if (status !== naver.maps.Service.Status.OK) {
                  return alert('Something went wrong!');
                }
                const location = response.v2.addresses[0];
                const latlng = new naver.maps.LatLng(location.y, location.x);

                const marker = new naver.maps.Marker({
                  position: latlng,
                  map: map,
                });
                const infoWindow = new naver.maps.InfoWindow({
                  content: [
                    '<div style="padding: 10px; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 16px 0px;">',
                    `   <div style="font-weight: bold; margin-bottom: 5px;">${selectedTitle}</div>`,
                    `   <div style="font-size: 13px;">${selectedReview}<div>`,
                    '</div>',
                  ].join(''),
                  maxWidth: 300,
                  anchorSize: {
                    width: 12,
                    height: 14,
                  },
                  borderColor: '#cecdc7',
                });

                naver.maps.Event.addListener(marker, 'click', () => {
                  if (infoWindow.getMap()) {
                    infoWindow.close();
                  } else {
                    infoWindow.open(map, marker);
                  }
                });

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
        width: '100%',
        height: '1100px',
        display: 'flex',
        marginTop: '5px',
        marginLeft: '10px',
      }}
    ></div>
  );
}
export default RestaurantsMap;
