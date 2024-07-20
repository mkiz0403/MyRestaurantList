import { Button, CssBaseline, TextField, FormControl, Grid, Box, Container } from '@mui/material/';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../api/userStoreApi';

function SignUp() {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userNickName, setUserNickName] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('패스워드를 확인해 주세요.');
    }
    try {
      const userInfo = await signup(userEmail, password, userNickName);
      console.log(`유저이메일: ${userEmail}, 유저 닉네임: ${userNickName}`);
      console.log('회원가입');
      alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
      navigate('/login');
    } catch (error) {
      console.error('에러발생');
    }
  }

  function handlcancle() {
    navigate('/login');
  }

  return (
    <>
      <Container component="main" maxWidth="xs" onSubmit={handleSubmit}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div>
            <h1>회원가입</h1>
          </div>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <FormControl component="fieldset" variant="standard">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    type="email"
                    id="email"
                    name="email"
                    label="이메일 주소"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="userNickName"
                    name="userNickName"
                    label="닉네임"
                    value={userNickName}
                    onChange={(e) => setUserNickName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="password"
                    name="password"
                    label="비밀번호 (숫자+영문자+특수문자 8자리 이상)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="rePassword"
                    name="rePassword"
                    label="비밀번호 재입력"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} size="large">
                회원가입
              </Button>
              <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} size="large" onClick={handlcancle}>
                취소하기
              </Button>
            </FormControl>
          </Box>
        </Box>
      </Container>
    </>
  );
}
export default SignUp;
