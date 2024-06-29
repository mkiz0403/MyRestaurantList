import './Userinfo.css';
import { useState, ChangeEvent } from 'react';
import testImage from '../../public/testImage.png';
import cameraImage from '../../public/pngwing.com.png';
import CategoryList from './CategoryList';

useState;

interface User {
  userNickName: string;
  foodTaste: string;
  userImage: string;
}

function UserInfo() {
  const [userProfile, setUserProfile] = useState<string>(testImage);
  const [previewImage, setPreviewImage] = useState<string>(userProfile);

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
            <strong>맛있는녀석들</strong>
          </div>
          <div className="profile-foodtaste">
            <span>🍲 한식의 아이콘</span>
          </div>
          <div>
            <button>정보수정</button>
          </div>
        </div>
      </div>
      <CategoryList />
    </>
  );
}
export default UserInfo;
