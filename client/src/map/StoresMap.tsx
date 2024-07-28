import $ from 'jquery';
import { useEffect, useRef } from 'react';
import { UserStore } from '../models/user.interface';
import RouletteButton from '../Roulette/RouletteButton';
import { getOneUserStore } from '../../api/userStoreApi';

declare global {
  interface Window {
    naver: any;
    copyToClipboard: any;
    closeInfoWindow: () => void;
    addToRoulette: (placeName: string) => void;
  }
}

interface MapProps {
  places: UserStore[];
  selectedAddress: string | null;
  userEmail: string;
  token: string;
  stores: string[];
  setStore: React.Dispatch<React.SetStateAction<string[]>>;
  addToRoulette: (placeName: string) => void;
}

const StoresMap = ({ places, selectedAddress, userEmail, token, stores, setStore, addToRoulette }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const infoWindowRef = useRef<any>(null);
  const mapInstance = useRef<any>(null);

  useEffect(() => {
    window.copyToClipboard = (text: string) => {
      navigator.clipboard
        .writeText(text)
        .then(
          () => {
            alert('주소가 복사되었습니다!');
          },
          () => {
            alert('복사에 실패했습니다. 다시 시도해주세요.');
          },
        )
        .catch((error: unknown) => {
          console.error('Error:', error);
          alert('복사에 실패했습니다. 다시 시도해주세요.');
        });
    };

    const { naver } = window;

    if (!naver) return;

    const initMap = () => {
      navigator.geolocation.getCurrentPosition((position) => {
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

        if (mapRef.current) {
          const map = new naver.maps.Map(mapRef.current, mapOptions);
          mapInstance.current = map;

          new naver.maps.Marker({
            position: new naver.maps.LatLng(latitude, longitude),
            map: map,
          });
          console.log(position);

          const infoWindow = new naver.maps.InfoWindow({
            anchorSkew: true,
          });
          infoWindowRef.current = infoWindow;

          map.setCursor('pointer');

          window.closeInfoWindow = () => {
            infoWindowRef.current.close();
          };

          function searchCoordinateToAddress(latlng: any) {
            if (infoWindowRef.current) {
              infoWindowRef.current.close();
            }

            naver.maps.Service.reverseGeocode(
              {
                coords: latlng,
                orders: [naver.maps.Service.OrderType.ADDR, naver.maps.Service.OrderType.ROAD_ADDR].join(','),
              },
              function (status: any, response: any) {
                if (status === naver.maps.Service.Status.ERROR) {
                  return alert('Something went wrong!');
                }

                const items = response.v2.results;
                let address = '';
                const htmlAddresses: string[] = [];

                items.forEach((item: any, index: number) => {
                  address = makeAddress(item) || '';
                  const addrType = item.name === 'roadaddr' ? '[도로명 주소]' : '[지번 주소]';
                  htmlAddresses.push(
                    `<div>${index + 1}. ${addrType} ${address} <button onclick="copyToClipboard('${address}')">복사</button></div>`,
                  );
                });

                infoWindowRef.current.setContent(
                  `<div style="padding:10px;min-width:200px;line-height:150%;">
                    <h4 style="margin-top:5px;">검색 좌표</h4><button onclick="setAddressToRegister('${address}')"> 맛집 등록 하기</button><br />
                    ${htmlAddresses.join('<br />')}
                    <button onclick="closeInfoWindow()">닫기</button>
                  </div>`,
                );
                infoWindowRef.current.open(map, latlng);
              },
            );
          }

          function searchAddressToCoordinate(address: any) {
            if (!address) {
              return alert('주소를 입력해주세요!');
            }

            if (infoWindowRef.current) {
              infoWindowRef.current.close();
            }

            naver.maps.Service.geocode(
              {
                query: address,
              },
              function (status: any, response: any) {
                if (status === naver.maps.Service.Status.ERROR) {
                  return alert('Something went wrong!');
                }

                if (response.v2.meta.totalCount === 0) {
                  return alert('totalCount: ' + response.v2.meta.totalCount);
                }

                const item = response.v2.addresses[0];
                const point = new naver.maps.Point(item.x, item.y);
                const htmlAddresses: string[] = [];
                if (item.roadAddress) {
                  htmlAddresses.push(
                    `<div>[도로명 주소] ${item.roadAddress} <button onclick="copyToClipboard('${item.roadAddress}')">복사</button></div>`,
                  );
                }

                if (item.jibunAddress) {
                  htmlAddresses.push(
                    `<div>[지번 주소] ${item.jibunAddress} <button onclick="copyToClipboard('${item.jibunAddress}')">복사</button></div>`,
                  );
                }

                infoWindowRef.current.setContent(
                  `<div style="padding:10px;min-width:200px;line-height:150%;">
                  <h4 style="margin-top:5px;">검색 좌표</h4><button onclick="setAddressToRegister('${address}')"> 맛집 등록 하기</button><br />
                    ${htmlAddresses.join('<br />')}
                    <button onclick="closeInfoWindow()">닫기</button>
                  </div>`,
                );

                if (mapInstance.current) {
                  mapInstance.current.setCenter(point);

                  new naver.maps.Marker({
                    position: point,
                    map: mapInstance.current,
                  });

                  infoWindowRef.current.open(mapInstance.current, point);
                }
              },
            );
          }

          function makeAddress(item: any) {
            if (!item) return '';

            const name = item.name;
            const region = item.region;
            const land = item.land;
            const isRoadAddress = name === 'roadaddr';

            let sido = '';
            let sigugun = '';
            let dongmyun = '';
            let ri = '';
            let rest = '';

            if (hasArea(region.area1)) {
              sido = region.area1.name;
            }
            if (hasArea(region.area2)) {
              sigugun = region.area2.name;
            }
            if (hasArea(region.area3)) {
              dongmyun = region.area3.name;
            }
            if (hasArea(region.area4)) {
              ri = region.area4.name;
            }
            if (land) {
              if (hasData(land.number1)) {
                if (hasData(land.type) && land.type === '2') {
                  rest += '산';
                }
                rest += land.number1;
                if (hasData(land.number2)) {
                  rest += '-' + land.number2;
                }
              }
              if (isRoadAddress) {
                if (checkLastString(dongmyun, '면')) {
                  ri = land.name;
                } else {
                  dongmyun = land.name;
                  ri = '';
                }
                if (hasAddition(land.addition0)) {
                  rest += ' ' + land.addition0.value;
                }
              }
            }

            return [sido, sigugun, dongmyun, ri, rest].join(' ');
          }

          function hasArea(area: any) {
            return !!(area && area.name && area.name !== '');
          }

          function hasData(data: any) {
            return !!(data && data !== '');
          }

          function checkLastString(word: string, lastString: string) {
            return new RegExp(lastString + '$').test(word);
          }

          function hasAddition(addition: any) {
            return !!(addition && addition.value);
          }

          map.addListener('click', (e: any) => {
            searchCoordinateToAddress(e.coord);
          });

          $('#address').on('keydown', (e: any) => {
            if (e.which === 13) {
              searchAddressToCoordinate($('#address').val());
            }
          });

          $('#submit').on('click', (e: any) => {
            e.preventDefault();
            searchAddressToCoordinate($('#address').val());
          });

          if (selectedAddress) {
            searchAddressToCoordinate(selectedAddress);
          }

          // window.addToRoulette = (placeName: string) => {
          //   if (!rouletteStore.includes(placeName)) {
          //     setRouletteStore((prevItems) => [...prevItems, placeName]);
          //   }
          // };

          window.addToRoulette = (placeName: string) => {
            addToRoulette(placeName);
          };

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
                const placeInfoWindow = new naver.maps.InfoWindow({
                  content: [
                    '<div style="padding: 10px; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 16px 0px;">',
                    `   <div style="font-weight: bold; margin-bottom: 5px;">${place.placeName}</div>`,
                    `   <div style="font-size: 13px;">${place.review}<div>`,
                    `   <button onclick="addToRoulette('${place.placeName}')">룰렛에 추가</button>`,
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
                  if (placeInfoWindow.getMap()) {
                    placeInfoWindow.close();
                  } else {
                    placeInfoWindow.open(map, marker);
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
                const selectedInfoWindow = new naver.maps.InfoWindow({
                  content: [
                    '<div style="padding: 10px; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 16px 0px;">',
                    `   <div style="font-weight: bold; margin-bottom: 5px;">${selectedTitle}</div>`,
                    `   <div style="font-size: 13px;">${selectedReview}</div>`,
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
                  if (selectedInfoWindow.getMap()) {
                    selectedInfoWindow.close();
                  } else {
                    selectedInfoWindow.open(map, marker);
                  }
                });
                map.setCenter(latlng);
              },
            );
          }
        }
        (error: unknown) => {
          console.error('Error getting current position:', error);
        };
      });
    };
    initMap();
  }, [places, selectedAddress, addToRoulette]);

  const handleSearchAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const address: any = (document.getElementById('address') as HTMLInputElement).value;
    searchAddressToCoordinate(address);
  };

  const searchAddressToCoordinate = (address: any) => {
    if (!address) {
      return alert('주소를 입력해주세요!');
    }

    if (infoWindowRef.current) {
      infoWindowRef.current.close();
    }

    const { naver } = window;

    if (!naver) return;

    naver.maps.Service.geocode(
      {
        query: address,
      },
      function (status: any, response: any) {
        if (status === naver.maps.Service.Status.ERROR) {
          return alert('Something Wrong!');
        }

        if (response.v2.meta.totalCount === 0) {
          return alert('totalCount' + response.v2.meta.totalCount);
        }

        var htmlAddresses = [],
          item = response.v2.addresses[0],
          point = new naver.maps.Point(item.x, item.y);

        if (item.roadAddress) {
          htmlAddresses.push(
            `<div>[도로명 주소] ${item.roadAddress} <button onclick="copyToClipboard('${item.roadAddress}')">복사</button></div>`,
          );
        }

        if (item.jibunAddress) {
          htmlAddresses.push(
            `<div>[지번 주소] ${item.jibunAddress} <button onclick="copyToClipboard('${item.jibunAddress}')">복사</button></div>`,
          );
        }
        infoWindowRef.current.setContent(
          [
            '<div style="padding:10px;min-width:200px;line-height:150%;">',
            '<h4 style="margin-top:5px;">검색 주소 : ' + address + '</h4><br />',
            htmlAddresses.join('<br />'),
            '</div>',
          ].join(''),
        );
        const map = mapInstance.current;
        if (map) {
          map.setCenter(point);

          new naver.maps.Marker({
            position: point,
            map: map,
          });

          infoWindowRef.current.open(map, point);
        }
      },
    );
  };

  return (
    <>
      <div
        ref={mapRef}
        style={{
          width: '100%',
          height: '1120px',
        }}
      >
        <div
          className="search-bar"
          style={{
            position: 'fixed',
            top: '1rem',
            left: '28rem',
            zIndex: 10,
            background: 'white',
            padding: '10px',
            borderRadius: '5px',
            boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
          }}
        >
          <input id="address" type="text" placeholder="주소 검색" />
          <button onClick={handleSearchAddress}>검색</button>
        </div>
        <RouletteButton stores={stores} setStore={setStore} userStore={places} addToRoulette={addToRoulette} />
      </div>
    </>
  );
};
export default StoresMap;
