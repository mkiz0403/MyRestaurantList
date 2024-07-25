import { FormEvent, useState } from 'react';
import styled from 'styled-components';
import { createStore } from '../../api/userStoreApi';

interface CreateStoreProps {
  onClose: () => void;
  userEmail: string;
  token: string;
}

function CreateStore({ onClose, userEmail, token }: CreateStoreProps) {
  const [placeName, setPlaceName] = useState('');
  const [foodType, setFoodType] = useState('');
  const [address, setAddress] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [review, setReview] = useState('');
  const [visitedDate, setVisitedDate] = useState([]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const store = await createStore(userEmail, placeName, foodType, address, imageUrl, review, visitedDate, token);
      // 호출할때 인수를 순서대로 넣어주자!!!!!!!!!!!!
      alert('스토어 생성 성공!');
      onClose();
    } catch (error) {
      console.log('스토어 생성 실패!', error);
    }
  }

  return (
    <>
      <Container>
        <Box>
          <Titel> 맛집 등록</Titel>
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
              <Input
                required
                id="storeType"
                name="storeType"
                type="text"
                value={foodType}
                onChange={(e) => setFoodType(e.target.value)}
              />
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
              <Button type="submit">맛집 등록 하기</Button>
              <Button type="button" onClick={onClose}>
                취소
              </Button>
            </ButtonBox>
          </Form>
        </Box>
      </Container>
    </>
  );
}
export default CreateStore;

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
  width: 30%;
  background-color: white;
  height: 750px;
  border-radius: 10px;
  border: 1px solid #007bff;
`;

const Titel = styled.h1`
  text-align: center;
  font-size: 30px;
  color: #007bff;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 80%;
`;

const Input = styled.input`
  width: 100%;
  height: 20px;
  border: 1px solid #007bff;
  border-radius: 5px;
  font-size: 24px;
  padding: 16px 0;
  margin: 10px 0 10px 0;
`;

const Label = styled.div`
  color: #007bff;
  font-size: 20px;
`;

const ButtonBox = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.button`
  width: 420px;
  height: 50px;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  color: white;
  margin-left: 5px;
  margin-right: 5px;
`;
