import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import StoresMap from './map/StoresMap';
import StoreInfoBox from './place/StoreInfoBox';
import CreateStore from './place/CreateStore';
import UserInfo from './user/UserInfo';
import UpdateUserInfo from './user/UpdataUserInfo';
// import Category from './user/Category';
import UserInterface from './models/user.interface';
import { UserStore } from './models/user.interface';
import { getUser, getUserStore, updateStore } from '../api/userStoreApi';

function Home() {
  const navigate = useNavigate();

  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [isCreateStore, setCreateStore] = useState(false);
  const [isUpdateUserInfoVisible, setUpdateUserInfoVisible] = useState(false);
  const [currentNickname, setCurrentNickname] = useState<string>('');
  const [currentUserEmail, setCurrentUserEmail] = useState<string>('');
  const [userInfo, setUserInfo] = useState<UserInterface | undefined>();
  const [places, setPlaces] = useState<UserStore[]>([]);
  const [token, setToken] = useState<string | null>(null);

  function handleOpenCreate() {
    setCreateStore(true);
  }

  function handleCloseCreate() {
    setCreateStore(false);
    console.log('닫힘');
  }

  function handleOpenUpdateUserInfo(userEmail: string, nickName: string) {
    setCurrentUserEmail(userEmail);
    setCurrentNickname(nickName);
    setUpdateUserInfoVisible(true);
  }

  function handleCloseUpdateUserInfo() {
    setUpdateUserInfoVisible(false);
  }
  function handleUserUpdate(updatedUser: UserInterface) {
    setUserInfo(updatedUser);
  }

  async function checkVisitedCount(storeId: string, visitedDate: string) {
    const updatedPlaces = places.map((place) =>
      place.storeId === storeId
        ? {
            ...place,
            visitedDate: place.visitedDate ? [...place.visitedDate, visitedDate] : [visitedDate],
          }
        : place,
    );
    setPlaces(updatedPlaces);

    const placeToUpdate = updatedPlaces.find((place) => place.storeId === storeId);
    if (placeToUpdate && userInfo && token) {
      await updateStore(
        storeId,
        userInfo.userEmail,
        token,
        placeToUpdate.placeName,
        placeToUpdate.foodType,
        placeToUpdate.address,
        placeToUpdate.imageUrl,
        placeToUpdate.review,
        placeToUpdate.visitedDate,
      );
    }
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
        setToken(token);
        const user = await getUser(userEmail, token);
        if (user) {
          setUserInfo(user);
        }

        const stores = await getUserStore(userEmail, token);

        if (stores) {
          setPlaces(stores);
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
            userType={userInfo?.userType}
            onUpdateUserInfo={() => {
              if (userInfo?.userNickName) {
                handleOpenUpdateUserInfo(userInfo.userEmail, userInfo.userNickName);
              }
            }}
            onUserLogOut={handleLogout}
            places={places}
          />
          <StoreInfoBox
            places={places}
            onSelectAddress={setSelectedAddress}
            onOpenCreateStore={handleOpenCreate}
            checkVisitedStore={checkVisitedCount}
          />
        </div>
        <div className="map-container">
          <StoresMap
            places={places}
            selectedAddress={selectedAddress}
            userEmail={userInfo?.userEmail || ''}
            token={token || ''}
          />
        </div>
        {isCreateStore && userInfo && token && (
          <CreateStore onClose={handleCloseCreate} userEmail={userInfo.userEmail} token={token} />
        )}
        {isUpdateUserInfoVisible && (
          <UpdateUserInfo
            userEmail={currentUserEmail}
            currentNickname={currentNickname}
            onClose={handleCloseUpdateUserInfo}
            onUpdate={handleUserUpdate}
          />
        )}
      </div>
    </>
  );
}
export default Home;
