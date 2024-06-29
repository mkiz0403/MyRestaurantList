import { Button, CssBaseline, TextField, FormControl, Grid, Box, Container } from '@mui/material/';
import { useState } from 'react';
import { Restaurant } from './RestaruantCategoryList';
import { useNavigate } from 'react-router-dom';

interface CreateRestaurantsItemProps {
  onClose: () => void;
}

function CreateRestaurantsItem({ onClose }: CreateRestaurantsItemProps) {
  const navigate = useNavigate();

  const [placeName, setPlaceName] = useState('');
  const [foodType, setFoodType] = useState('');
  const [address, setAddress] = useState('');
  const [review, setReview] = useState('');

  async function handleSubmit() {
    try {
      console.log('전송완료');
    } catch (error) {
      throw error;
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
            <h1>맛집 리스트 등록</h1>
          </div>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <FormControl component="fieldset" variant="standard">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    id="placeName"
                    name="placeName"
                    label="매장명"
                    value={placeName}
                    onChange={(e) => setPlaceName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="foodType"
                    name="foodType"
                    label="음식유형"
                    value={foodType}
                    onChange={(e) => setFoodType(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="address"
                    id="address"
                    name="address"
                    label="매장 주소"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="review"
                    id="review"
                    name="review"
                    label="리뷰"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} size="large">
                맛집 등록 하기
              </Button>
              <Button onClick={onClose} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} size="large">
                닫 기
              </Button>
            </FormControl>
          </Box>
        </Box>
      </Container>
    </>
  );
}
export default CreateRestaurantsItem;
