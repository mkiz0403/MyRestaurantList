import { useState, useEffect } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import StoreListItems from './StoreListItems';
import { Button, TextField, InputAdornment, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { UserStore } from '../models/user.interface';

export interface Stores {
  storeId: string;
  imageUrl?: string | undefined;
  foodType: string;
  placeName: string;
  review?: string | undefined;
  address: string;
  visitedDate?: string[];
}

interface StoresListProps {
  places: Stores[];
  onSelectAddress: (address: string) => void;
  onOpenCreateStore: () => void;
  checkVisitedStore: (storeId: string, visitDate: string) => void;
  addToRoulette: (placeName: string) => void;
  userEmail: string;
  token: string;
  onUpdatePlaces: (updatedPlaces: Stores[]) => void;
  handleDeleteStore: (userEmail: string, storeId: string, token: string) => Promise<UserStore | undefined>;
}

const categories = [
  { icon: '🍲', title: '한식' },
  { icon: '🍕', title: '양식' },
  { icon: '🍣', title: '일식' },
  { icon: '🥟', title: '중식' },
  { icon: '🍽️', title: '기타' },
];

function StoreInfoBox({
  places,
  onSelectAddress,
  onOpenCreateStore,
  checkVisitedStore,
  addToRoulette,
  userEmail,
  token,
  onUpdatePlaces,
  handleDeleteStore,
}: StoresListProps) {
  const [openCategoryIndex, setOpenCategoryIndex] = useState<number | null>(null);
  const [searchStore, setSearchStore] = useState('');
  const [filteredPlaces, setFilteredPlaces] = useState<Stores[]>(places);
  const [expandedStore, setExpandedStore] = useState<string | null>(null);

  useEffect(() => {
    setFilteredPlaces(places.filter((place) => place.placeName.toLowerCase().includes(searchStore.toLowerCase())));
  }, [searchStore, places]);

  function handleCategoryClick(index: number) {
    setOpenCategoryIndex(openCategoryIndex === index ? null : index);
  }

  const handleSearchEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && filteredPlaces.length === 1) {
      onSelectAddress(filteredPlaces[0].address);
      setSearchStore('');
      setExpandedStore(filteredPlaces[0].storeId);
    }
  };

  return (
    <div>
      <div>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="음식점 검색"
          value={searchStore}
          onChange={(e) => setSearchStore(e.target.value)}
          onKeyDown={handleSearchEnter}
          sx={{
            width: '100%',
            lineHeight: '30px',
            fontWeight: 500,
            fontSize: '14px',
            marginTop: '10px',
            border: 'solid 1px #4a90e2',
            borderRadius: '10px',
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {searchStore &&
          filteredPlaces.map((place, idx) => (
            <Button key={idx} onClick={() => onSelectAddress(place.address)}>
              {place.placeName}
            </Button>
          ))}
      </Box>
      <Button
        sx={{
          width: '100%',
          lineHeight: '40px',
          color: '#4a90e2',
          fontWeight: 500,
          fontSize: '14px',
          marginTop: '10px',
          border: 'solid 1px #4a90e2',
          borderRadius: '10px',
        }}
        onClick={onOpenCreateStore}
      >
        맛집 추가하기 +
      </Button>
      <List
        sx={{
          marginTop: '10px',
          overflow: 'auto',
          bgcolor: 'background.paper',
          borderInlineColor: 'blue',
          borderTop: '1px solid #e0e0e0',
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            sx={{
              backgroundColor: '#4a90e2',
              borderRadius: '10px',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '54px',
            }}
          >
            <strong>나의 맛집 리스트</strong>
          </ListSubheader>
        }
      >
        {categories.map((item, idx) => {
          const categoryPlaces = places.filter((restaurant) => restaurant.foodType === item.title);

          return (
            <StoreListItems
              key={idx}
              icon={item.icon}
              title={item.title}
              places={categoryPlaces}
              onSelectAddress={onSelectAddress}
              isOpen={openCategoryIndex === idx}
              onClick={() => handleCategoryClick(idx)}
              checkVisitedStore={checkVisitedStore}
              addToRoulette={addToRoulette}
              expandedStore={expandedStore}
              setExpandedStore={setExpandedStore}
              userEmail={userEmail}
              token={token}
              onUpdatePlaces={onUpdatePlaces}
              handleDeleteStore={handleDeleteStore}
            />
          );
        })}
      </List>
    </div>
  );
}

export default StoreInfoBox;
