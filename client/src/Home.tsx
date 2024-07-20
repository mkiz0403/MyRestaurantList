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
import { getUser, getUserStore } from '../api/userStoreApi';

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

        const restaurents = await getUserStore(userEmail, token);

        if (restaurents) {
          setPlaces(restaurents);
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
          <StoreInfoBox places={places} onSelectAddress={setSelectedAddress} onOpenCreateStore={handleOpenCreate} />
        </div>
        <StoresMap places={places} selectedAddress={selectedAddress} />
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
