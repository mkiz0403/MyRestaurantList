import { FormEvent, useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import { createStore } from '../../api/userStoreApi';

interface CreateStoreProps {
  onClose: () => void;
  userEmail: string;
  token: string;
}

const foodOptions = ['한식', '양식', '일식', '중식', '기타'];

function CreateStore({ onClose, userEmail, token }: CreateStoreProps) {
  const [placeName, setPlaceName] = useState('');
  const [address, setAddress] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [review, setReview] = useState('');
  const [foodType, setFoodType] = useState('');
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

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;
    if (selectedOption && !foodType.includes(selectedOption)) {
      setFoodType(selectedOption);
    }
  };

  return (
    <>
      <Container>
        <Box>
          <Title> 맛집 등록</Title>
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
