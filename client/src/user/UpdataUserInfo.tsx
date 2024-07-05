import { ChangeEvent, FormEvent, useState } from 'react';
import styled from 'styled-components';
import { userUpdate, getUser } from '../../api/userRestaurantApi';
import UserInterface from '../models/user.interface';

interface UpdateUserInfoProps {
  currentNickname: string;
  onClose: () => void;
}

function UpdateUserInfo({ currentNickname, onClose }: UpdateUserInfoProps) {
  const [userData, setUserData] = useState<UserInterface | undefined>(undefined);
  const [formData, setFormData] = useState({
    userNickName: currentNickname,
    curruntPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmNewPassword) {
      alert('새 비밀번호가 일치하지 않습니다.');
      return;
    }
    try {
      await userUpdate(
        formData.userNickName,
        formData.curruntPassword,
        formData.newPassword,
        formData.confirmNewPassword,
      );
      alert('정보가 성공적으로 업데이트되었습니다.');
      onClose();
    } catch (error) {
      console.error('업데이트 실패', error);
      alert('업데이트 실패');
    }
  }

  return (
    <>
      <Container>
        <Box>
          <Titel> 정보 수정</Titel>
          <Form onSubmit={handleSubmit}>
            <TextBox>
              <Label>이메일</Label>
              <Text>mkiz0403@gmail.com</Text>
            </TextBox>
            <InputBox>
              <Label> 닉네임</Label>
              <Input
                required
                id="userNickName"
                name="userNickName"
                value={formData.userNickName}
                onChange={handleChange}
              />
            </InputBox>
            <InputBox>
              <Label>기존 비밀번호</Label>
              <Input
                required
                id="currentPassword"
                name="currentPassword"
                value={formData.curruntPassword}
                onChange={handleChange}
              />
            </InputBox>
            <InputBox>
              <Label>새로운 비밀번호</Label>
              <Input
                required
                id="newPasswrord"
                name="newPasswrord"
                value={formData.newPassword}
                onChange={handleChange}
              />
            </InputBox>
            <InputBox>
              <Label>비밀번호 확인</Label>
              <Input
                required
                id="confimNewPasswrord"
                name="confimNewPasswrord"
                value={formData.confirmNewPassword}
                onChange={handleChange}
              />{' '}
            </InputBox>
          </Form>
          <ButtonBox>
            <Button type="submit">수정하기</Button>
            <Button type="button" onClick={onClose}>
              취소
            </Button>
          </ButtonBox>
        </Box>
      </Container>
    </>
  );
}
export default UpdateUserInfo;

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
  height: 600px;
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
  display: flex;
  justify-content: space-between;
  padding: 20px;
  gap: 20px;
`;

const Button = styled.button`
  width: 420px;
  height: 50px;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  color: white;
`;
