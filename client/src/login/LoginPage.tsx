import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import RestorauntMapImage from '../../public/RestorauntMapImage.webp';
import { login } from '../../api/userStoreApi';

function LoginPage() {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [saveLoginInfo, setSaveLoginInfo] = useState(false);

  useEffect(() => {
    const savedUserEmail = localStorage.getItem('userEmail');
    const savedUserPassword = localStorage.getItem('password');
    if (savedUserEmail && savedUserPassword) {
      setUserEmail(savedUserEmail);
      setPassword(savedUserPassword);
      setSaveLoginInfo(true);
    }
  }, []);

  async function handleLogin(e: { preventDefault: () => void }) {
    e.preventDefault();

    if (!userEmail) {
      alert('등록된 아이디가 아닙니다.');
      return;
    }

    if (!password) {
      alert('패스워드가 일치하지 않습니다.');
      return;
    }

    try {
      const res = await login(userEmail, password);
      if (res) {
        const { token, user } = res;

        localStorage.setItem('jwtToken', token);
        localStorage.setItem('userEmail', userEmail);
        console.log('로그인 성공', user);

        if (saveLoginInfo) {
          localStorage.setItem('userId', userEmail);
          localStorage.setItem('password', password);
        } else {
          localStorage.removeItem('userId');
          localStorage.removeItem('password');
        }
        navigate(`/user/${userEmail}`);
        console.log(saveLoginInfo);
      }
    } catch (error) {
      console.error('로그인 실패');
    }
  }

  return (
    <Container>
      <Image src={RestorauntMapImage} />
      <Box>
        <Titel>로그인</Titel>
        <Form>
          <FormFiled>
            <FormFiled>
              <Label>아이디</Label>
              <Input required id="userEmail" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
            </FormFiled>
            <FormFiled />
            <Label>비밀번호</Label>
            <Input
              required
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormFiled>
        </Form>
        <AutoLogin>
          <AutoLoginLabel>자동 입력</AutoLoginLabel>
          <Checkbox value="remember" checked={saveLoginInfo} onChange={() => setSaveLoginInfo(!saveLoginInfo)} />
        </AutoLogin>

        <Button type="submit" onClick={handleLogin}>
          로그인 하기
        </Button>

        <SignUpTextBox>
          <SignUpText> 회원이 아니시라면 👉</SignUpText>
          <Link to={'/signup'}> 회원 가입하기 </Link>
        </SignUpTextBox>
      </Box>
    </Container>
  );
}
export default LoginPage;

const Container = styled.div`
  width: 100%;
  padding: 0;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Image = styled.img`
  width: 100%;
  height: 800px;
  padding-right: 20px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 500px;
  margin-top: 300px;
  margin-right: 10px;
`;

const Titel = styled.h1`
  text-align: center;
  font-size: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormFiled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const Input = styled.input`
  width: 400px;
  height: 30px;
  border: 1px solid #007bff;
  border-radius: 5px;
  font-size: 24px;
  padding: 16px;
`;

const Label = styled.div`
  color: #007bff;
  font-size: 20px;
  margin-bottom: 5px;
`;

const AutoLogin = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 54px;
  width: 100%;
  margin-bottom: 20px;
`;

const AutoLoginLabel = styled(Label)`
  font-size: 18px;
  margin-right: 10px;
  margin-bottom: 0;
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  width: 18px;
  height: 18px;
  align-items: center;
  justify-content: center;
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

const SignUpTextBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SignUpText = styled.p``;
