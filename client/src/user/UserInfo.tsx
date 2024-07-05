import './Userinfo.css';
import { useState, ChangeEvent } from 'react';
import testImage from '../../public/testImage.png';
import cameraImage from '../../public/pngwing.com.png';
import CategoryList from './CategoryList';
import {} from '../../api/userRestaurantApi';
import UserInterface from '../models/user.interface';

interface UserInfoProps {
  userEmail?: string;
  userNickName?: string;
  userImg?: string;
  onUpdateUserInfo: () => void;
  onUserLogOut: (e: React.FormEvent) => Promise<void>;
}

function UserInfo({ userEmail, userNickName, userImg, onUpdateUserInfo, onUserLogOut }: UserInfoProps) {
  const [userProfile, setUserProfile] = useState<string>(testImage);
  const [previewImage, setPreviewImage] = useState<string>(userProfile);
  const [userData, setUserData] = useState<UserInterface | undefined>(undefined);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const handleUploadClick = () => {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <>
      <div className="profile-container">
        <div className="profile-picture-uploader">
          <div className="profile-image-container">
            <img src={previewImage} alt="Profile" className="profile-image" />
            <div className="camera-icon-container" onClick={handleUploadClick}>
              <img src={cameraImage} alt="Camera Icon" className="camera-icon" />
            </div>
          </div>
          <input type="file" id="fileInput" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} />
        </div>
        <div className="profile-info">
          <div className="profile-nickname">
            <strong>{userNickName}</strong>
          </div>
          <div className="profile-foodtaste">
            <span>🍲 한식의 아이콘</span>
          </div>
          <div>
            <button onClick={onUpdateUserInfo}>정보수정</button>
            <button onClick={onUserLogOut}>로그아웃</button>
          </div>
        </div>
      </div>
      <CategoryList />
    </>
  );
}
export default UserInfo;
