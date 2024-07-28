import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import StoresMap from './map/StoresMap';
import StoreInfoBox from './Store/StoreInfoBox';
import CreateStore from './Store/CreateStore';
import UserInfo from './user/UserInfo';
import UpdateUserInfo from './user/UpdataUserInfo';
import UserInterface from './models/user.interface';
import { UserStore } from './models/user.interface';
import { getUser, getUserStore, updateStore, deleteOneStore } from '../api/userStoreApi';

function Home() {
  const navigate = useNavigate();

  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [isCreateStore, setCreateStore] = useState(false);
  const [isUpdateUserInfoVisible, setUpdateUserInfoVisible] = useState(false);
  const [currentNickname, setCurrentNickname] = useState<string>('');
  const [currentUserEmail, setCurrentUserEmail] = useState<string>('');
  const [userInfo, setUserInfo] = useState<UserInterface | undefined>();
  const [places, setPlaces] = useState<UserStore[]>([]);
  const [rouletteStores, setRouletteStores] = useState<string[]>([]);
  const [token, setToken] = useState<string | null>(null);

  const fetchUserInfo = useCallback(async () => {
    const storedToken = localStorage.getItem('jwtToken');
    const storedUserEmail = localStorage.getItem('userEmail');
    if (storedToken && storedUserEmail) {
      setToken(storedToken);
      const user = await getUser(storedUserEmail, storedToken);
      if (user) {
        setUserInfo(user);
      }

      const stores = await getUserStore(storedUserEmail, storedToken);
      if (stores) {
        setPlaces(stores);
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  function handleOpenCreate() {
    setCreateStore(true);
  }

  function handleCloseCreate() {
    setCreateStore(false);
    console.log('닫힘');
  }

  const addToRoulette = (placeName: string) => {
    if (!rouletteStores.includes(placeName)) {
      setRouletteStores([...rouletteStores, placeName]);
    }
  };

  function handleOpenUpdateUserInfo(userEmail: string, nickName: string) {
    setCurrentUserEmail(userEmail);
    setCurrentNickname(nickName);
    setUpdateUserInfoVisible(true);
  }

  function handleCloseUpdateUserInfo() {
    setUpdateUserInfoVisible(false);
    fetchUserInfo();
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
      await fetchUserInfo();
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

  async function handleUpdatePlaces(updatedPlaces: UserStore[]) {
    setPlaces(updatedPlaces);
    await fetchUserInfo();
  }

  const handleDeleteStore = async (userEmail: string, storeId: string, token: string) => {
    try {
      const deletedStore = await deleteOneStore(userEmail, storeId, token);
      await fetchUserInfo();
      return deletedStore;
    } catch (error) {
      console.error('Error deleting store:', error);
      return undefined;
    }
  };

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
            addToRoulette={addToRoulette}
            userEmail={userInfo?.userEmail || ''}
            token={token || ''}
            onUpdatePlaces={handleUpdatePlaces}
            handleDeleteStore={handleDeleteStore}
          />
        </div>
        <div className="map-container">
          <StoresMap
            places={places}
            selectedAddress={selectedAddress}
            userEmail={userInfo?.userEmail || ''}
            token={token || ''}
            addToRoulette={addToRoulette}
            stores={rouletteStores}
            setStore={setRouletteStores}
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
