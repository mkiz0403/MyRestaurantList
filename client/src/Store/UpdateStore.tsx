import { useState, FormEvent } from 'react';
import styled from 'styled-components';
import { UserStore } from '../models/user.interface';
import { updateStore } from '../../api/userStoreApi';

const foodOptions = ['한식', '양식', '일식', '중식', '기타'];

interface UpdateStoreProps {
  onClose: () => void;
  userEmail: string;
  token: string;
  store: UserStore;
  onUpdate: (updatedStore: UserStore) => void;
}
function UpdateStore({ onClose, userEmail, token, store, onUpdate }: UpdateStoreProps) {
  const [placeName, setPlaceName] = useState(store.placeName);
  const [address, setAddress] = useState(store.address);
  const [imageUrl, setImageUrl] = useState(store.imageUrl || '');
  const [review, setReview] = useState(store.review || '');
  const [foodType, setFoodType] = useState(store.foodType);

  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setFoodType(e.target.value);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const updatedStore = await updateStore(
        store.storeId,
        userEmail,
        token,
        placeName,
        foodType,
        address,
        imageUrl,
        review,
        store.visitedDate,
      );
      if (updatedStore) {
        onUpdate(updatedStore);
        alert('음식점 정보가 수정되었습니다!');
        onClose();
      } else {
        alert('음식점 정보 수정 실패!');
      }
    } catch (error) {
      console.error('음식점 정보 수정 실패!', error);
      alert('음식점 정보 수정 중 오류가 발생했습니다.');
    }
  }

  return (
    <Container>
      <Box>
        <Title>음식점 정보 수정</Title>
        <Form onSubmit={handleSubmit}>
          <InputBox>
            <Label>매장명</Label>
            <Input
              required
              id="storeName"
              name="storeName"
              type="text"
              value={placeName}
              onChange={(e) => setPlaceName(e.target.value)}
            />
          </InputBox>
          <InputBox>
            <Label>음식종류</Label>
            <Select id="storeType" name="storeType" value={foodType} onChange={handleSelectChange}>
              <option value="" disabled>
                음식 종류를 선택하세요
              </option>
              {foodOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </InputBox>
          <InputBox>
            <Label>매장사진</Label>
            <Input
              required
              id="storeImg"
              name="storeImg"
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </InputBox>
          <InputBox>
            <Label>주소</Label>
            <Input
              id="storeAdress"
              name="storeAdress"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </InputBox>
          <InputBox>
            <Label>매장 메모</Label>
            <Input
              id="storeRivew"
              name="storeRivew"
              type="text"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </InputBox>
          <ButtonBox>
            <Button type="submit">수정 완료</Button>
            <Button type="button" onClick={onClose}>
              취소
            </Button>
          </ButtonBox>
        </Form>
      </Box>
    </Container>
  );
}

export default UpdateStore;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  padding: 0;
  margin: auto;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const Box = styled.div`
  width: 420px;
  background-color: white;
  /* height: 700px; */
  border-radius: 10px;
  border: 1px solid #007bff;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 24px;
  color: #007bff;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
  gap: 16px;
`;

const InputBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Input = styled.input`
  height: 32px;
  border: 1px solid #007bff;
  border-radius: 5px;
  font-size: 16px;
  padding: 8px 16px;
  /* margin: 8px 0 8px 0; */
`;

const Select = styled.select`
  height: 54px;
  padding: 8px;
  border: 1px solid #007bff;
  border-radius: 4px;
  font-size: 16px;
`;

const Label = styled.div`
  color: #007bff;
  font-size: 16px;
`;

const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  padding: 20px 0;
  gap: 8px;
`;

const Button = styled.button`
  width: 100%;
  height: 48px;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  color: white;
`;
