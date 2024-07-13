import * as React from 'react';

import {
  Button,
  CssBaseline,
  TextField,
  FormControl,
  Grid,
  Box,
  Container,
  MenuItem,
  InputLabel,
  OutlinedInput,
} from '@mui/material/';
import { Theme, useTheme } from '@mui/material/styles';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { useState } from 'react';
import { Restaurant } from './RestaruantCategoryList';
import { useNavigate } from 'react-router-dom';

interface CreateRestaurantsItemProps {
  onClose: () => void;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = ['한식', '양식', '일식', '중식', '기타'];

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
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

  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

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
                  <div>
                    <FormControl sx={{ width: 400 }}>
                      <InputLabel id="demo-multiple-name-label">음식종류</InputLabel>
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        value={personName}
                        onChange={handleChange}
                        input={<OutlinedInput label="Name" />}
                        MenuProps={MenuProps}
                      >
                        {names.map((name) => (
                          <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
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
              <Button onClick={onClose} fullWidth variant="contained" sx={{ mb: 2 }} size="large">
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
