import { ChangeEvent, FormEvent, useState } from 'react';
import styled from 'styled-components';
import { userUpdate } from '../../api/userStoreApi';
import UserInterface from '../models/user.interface';

interface UpdateUserInfoProps {
  userEmail: string;
  currentNickname: string;
  onClose: () => void;
  onUpdate: (updatedUser: UserInterface) => void;
}

function UpdateUserInfo({ userEmail, currentNickname, onClose, onUpdate }: UpdateUserInfoProps) {
  const [formData, setFormData] = useState({
    userEmail: userEmail,
    userNickName: currentNickname,
    password: '',
    newPassword: '',
    confirmNewPassword: '',
    userImg: '',
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
      const updatedUser = await userUpdate(
        formData.userEmail,
        formData.userNickName,
        formData.password || undefined,
        formData.newPassword || undefined,
        formData.confirmNewPassword || undefined,
        formData.userImg || undefined,
      );
      if (updatedUser) {
        alert('정보가 성공적으로 업데이트되었습니다.');
        onUpdate(updatedUser);
        onClose();
      }
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
            <InputBox>
              <Label> 이메일</Label>
              <ReadOnlyInput required id="userEmail" name="userEmail" type="text" value={formData.userEmail} readOnly />
            </InputBox>
            <InputBox>
              <Label> 닉네임</Label>
              <Input
                required
                id="userNickName"
                name="userNickName"
                type="text"
                value={formData?.userNickName}
                onChange={handleChange}
              />
            </InputBox>
            <InputBox>
              <Label>기존 비밀번호</Label>
              <Input id="password" name="password" type="password" value={formData?.password} onChange={handleChange} />
            </InputBox>
            <InputBox>
              <Label>새로운 비밀번호</Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                value={formData?.newPassword}
                onChange={handleChange}
              />
            </InputBox>
            <InputBox>
              <Label>비밀번호 확인</Label>
              <Input
                id="confirmNewPassword"
                name="confirmNewPassword"
                type="password"
                value={formData?.confirmNewPassword}
                onChange={handleChange}
              />
            </InputBox>
            <ButtonBox>
              <Button type="submit">수정하기</Button>
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
  width: 420px;
  background-color: white;
  /* height: 700px; */
  border-radius: 10px;
  border: 1px solid #007bff;
`;

const Titel = styled.h1`
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
`;
const ReadOnlyInput = styled.input`
  height: 32px;
  border: 1px solid #007bff;
  background-color: #ededed;
  border-radius: 5px;
  font-size: 16px;
  padding: 8px 16px;
  pointer-events: none;
  cursor: not-allowed;
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
