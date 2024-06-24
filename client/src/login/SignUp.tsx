import { Button, CssBaseline, TextField, FormControl, Grid, Box, Container } from '@mui/material/';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [userName, setUserName] = useState('');

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  }

  async function handleUpload() {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await fetch('http://localhost:4000/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('이미지 업로드 성공');
      } else {
        console.error('이미지 업로드 실패');
      }
    } catch (error) {
      console.error('업로드 에러:', error);
    }
  }

  async function handleRemove() {
    if (!selectedImage) return;
    setSelectedImage(null);
    setPreviewUrl(null);
    console.log('미리보기 이미지가 삭제되었습니다.');
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      console.log(`유저이메일: ${userEmail}, 유저 닉네임: ${userName}, 이미지 : ${selectedImage}`);
      console.log('회원가입');
      await handleUpload();
      navigate('/');
    } catch (error) {
      console.error('에러발생');
    }
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
          <div>
            <h1>나의 이미지</h1>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {previewUrl && (
              <div>
                <div>
                  <img
                    style={{
                      width: '200px',
                      height: 'auto',
                      borderRadius: '50%',
                    }}
                    src={previewUrl}
                    alt="Preview"
                  />
                </div>
                <div>
                  <Button variant="contained" onClick={handleRemove} sx={{ mt: 2 }}>
                    x
                  </Button>
                </div>
              </div>
            )}
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
                    id="userName"
                    name="userName"
                    label="닉네임"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
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
            </FormControl>
          </Box>
        </Box>
      </Container>
    </>
  );
}
export default SignUp;
