import { ChangeEvent, FormEvent, useState } from 'react';
import styled from 'styled-components';

interface CreateRestaurantProps {
  onClose: () => void;
  address: string;
}

function CreateRestaurant({ onClose, address }: CreateRestaurantProps) {
  const [formData, setFormData] = useState({
    storeName: '',
    storeType: '',
    storeAdress: address,
    storeRivew: '',
    storeMemo: '',
    storeImg: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('전송완료', formData);
  };

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
                value={formData?.storeName}
                onChange={handleChange}
              />
            </InputBox>
            <InputBox>
              <Label>음식종류</Label>
              <Input
                required
                id="storeType"
                name="storeType"
                type="select"
                value={formData?.storeType}
                onChange={handleChange}
              />
            </InputBox>
            <InputBox>
              <Label>매장사진</Label>
              <Input
                required
                id="storeImg"
                name="storeImg"
                type="img"
                value={formData?.storeImg}
                onChange={handleChange}
              />
            </InputBox>
            <InputBox>
              <Label>주소</Label>
              <Input
                id="storeAdress"
                name="storeAdress"
                type="storeAdress"
                value={formData?.storeAdress}
                onChange={handleChange}
              />
            </InputBox>
            <InputBox>
              <Label>매장 메모</Label>
              <Input
                id="storeRivew"
                name="storeRivew"
                type="text"
                value={formData?.storeRivew}
                onChange={handleChange}
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
export default CreateRestaurant;

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
`;

const Input = styled.input`
  width: 250px;
  height: 20px;
  border: 1px solid #007bff;
  border-radius: 5px;
  font-size: 24px;
  padding: 16px;
  margin: 5px 0 5px 0;
`;

const Label = styled.div`
  color: #007bff;
  font-size: 20px;
`;

const TextBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 10px;
  width: 100%;
`;

const Text = styled.h2`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: #007bff;
  margin-left: 10px;
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
