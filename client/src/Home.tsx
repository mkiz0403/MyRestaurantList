const places = [
  {
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Kimbap_heaven.jpg/440px-Kimbap_heaven.jpg',
    foodType: '한식',
    placeName: '김밥천국',
    review: '수많은 음식중에 김밥이 제일 맛있음.',
    address: '서울특별시 서초구 서초대로77길 45',
    visitsCount: 10,
  },
  {
    imageUrl:
      'http://tnnews.co.kr/wp-content/uploads/2021/10/%EC%9D%B4%EB%AF%B8%EC%A7%801-%ED%99%8D%EC%BD%A9%EB%B0%98%EC%A0%900410-%EC%86%8C%EA%B7%9C%EB%AA%A8-%ED%8F%AC%EC%9E%A5%C2%B7%EB%B0%B0%EB%8B%AC-%EC%A0%84%EB%AC%B8-%EB%A7%A4%EC%9E%A5-%EC%98%A4%ED%94%88%EC%A2%85%EC%95%94%EC%A0%900.jpg',
    foodType: '중식',
    placeName: '홍콩반점',
    review: '믿고 먹는 백종원표 중식!',
    address: '역삼동 827-4번지 강남구 서울특별시 KR',
    visitsCount: 5,
  },
  {
    imageUrl: 'https://d12zq4w4guyljn.cloudfront.net/20240610071533_photo1_VqmGpLybPOZz.jpg',
    foodType: '일식',
    placeName: '상무초밥',
    review: '초밥초밥',
    address: '서울특별시 강남구 봉은사로 111',
    visitsCount: 4,
  },
  {
    imageUrl: 'https://img.siksinhot.com/story/1525664445806217.jpg?w=540&h=436&c=Y',
    foodType: '한식',
    placeName: '신자네 연탄구이',
    review: '멜젓 맛있는 곳',
    address: '전북 군산시 부곡1길 17',
    visitsCount: 4,
  },
  {
    imageUrl:
      'https://mblogthumb-phinf.pstatic.net/MjAyMDA5MjJfMjQg/MDAxNjAwNzUzNzAxNDI5.MpzJO-9OQv_Qp98Oa9BHnPOZjYHW2zN6M316qSjy8G8g.xK4IxsL_FTxhcy3qGD-0aFNa5_GBNLfARbk678zPRtsg.JPEG.wkdtjdud751/output_3421695154.jpg?type=w800',
    foodType: '중식',
    placeName: '도화원',
    review: '시키면 왕 많이 주는 곳',
    address: '전라남도 순천시 중앙2길 10',
    visitsCount: 4,
  },
];

import { useState } from 'react';
import './Home.css';
import RestaurantsMap from './map/RestaurantsMap';
import RestaurantsInfo from './place/RestaurantsInfo';
import UserInfo from './user/UserInfo';
// import Category from './user/Category';

function Home() {
  const [selectedAddress, setSelectedAddress] = useState<string>('');

  return (
    <>
      <div className="home-container">
        <div className="info-container">
          <UserInfo />
          <RestaurantsInfo places={places} onSelectAddress={setSelectedAddress} />
        </div>
        <RestaurantsMap places={places} selectedAddress={selectedAddress} />
      </div>
    </>
  );
}
export default Home;
