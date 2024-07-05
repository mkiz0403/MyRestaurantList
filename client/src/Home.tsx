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
    foodType: '양식',
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

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import RestaurantsMap from './map/RestaurantsMap';
import RestaruantList from './place/RestaruantCategoryList';
import CreateRestaurantsItem from './place/CreateRestaurantsItem';
import UserInfo from './user/UserInfo';
import UpdateUserInfo from './user/UpdataUserInfo';
// import Category from './user/Category';
import UserInterface from './models/user.interface';
import { getUser } from '../api/userRestaurantApi';

function Home() {
  const navigate = useNavigate();

  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [isCreateItemVisible, setCreateItemVisible] = useState(false);
  const [isUpdateUserInfoVisible, setUpdateUserInfoVisible] = useState(false);
  const [currentNickname, setCurrentNickname] = useState<string>('');
  const [userInfo, setUserInfo] = useState<UserInterface | undefined>();
  const [places, setPlaces] = useState<any[]>([]);

  function handleOpenCreateItem() {
    setCreateItemVisible(true);
  }

  function handleCloseCreateItem() {
    setCreateItemVisible(false);
  }

  function handleOpenUpdateUserInfo(nickName: string) {
    setCurrentNickname(nickName);
    setUpdateUserInfoVisible(true);
  }

  function handleCloseUpdateUserInfo() {
    setUpdateUserInfoVisible(false);
  }

  async function handleLogout(e: React.FormEvent) {
    e.preventDefault();
    try {
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('userEmail');

      alert('로그아웃 됐습니다.');
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('jwtToken');
      const userEmail = localStorage.getItem('userEmail');
      if (token && userEmail) {
        const user = await getUser(userEmail, token);
        if (user) {
          setUserInfo(user);
          setPlaces(user.userRestaurent || []);
        }
      } else {
        navigate('/login');
      }
    };

    fetchUserInfo();
  }, [navigate]);

  return (
    <>
      <div className="home-container">
        <div className="info-container">
          <UserInfo
            userEmail={userInfo?.userEmail}
            userNickName={userInfo?.userNickName}
            userImg={userInfo?.userImg}
            onUpdateUserInfo={() => {
              if (userInfo?.userNickName) {
                handleOpenUpdateUserInfo(userInfo.userNickName);
              }
            }}
            onUserLogOut={handleLogout}
          />
          <RestaruantList
            places={places}
            onSelectAddress={setSelectedAddress}
            onOpenCreateitme={handleOpenCreateItem}
          />
        </div>
        <RestaurantsMap places={places} selectedAddress={selectedAddress} />
        {isCreateItemVisible && <CreateRestaurantsItem onClose={handleCloseCreateItem} />}
        {isUpdateUserInfoVisible && (
          <UpdateUserInfo currentNickname={currentNickname} onClose={handleCloseUpdateUserInfo} />
        )}
      </div>
    </>
  );
}
export default Home;
