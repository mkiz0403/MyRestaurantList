import { useState } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import StoreListItems from './StoreListItems';
import { Button } from '@mui/material';

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
}

const categories = [
  { icon: '🍲', title: '한식' },
  { icon: '🍕', title: '양식' },
  { icon: '🍣', title: '일식' },
  { icon: '🥟', title: '중식' },
  { icon: '🍽️', title: '기타' },
];

function StoreInfoBox({ places, onSelectAddress, onOpenCreateStore, checkVisitedStore }: StoresListProps) {
  const [openCategoryIndex, setOpenCategoryIndex] = useState<number | null>(null);

  function handleCategoryClick(index: number) {
    setOpenCategoryIndex(openCategoryIndex === index ? null : index);
  }

  return (
    <div>
      <Button
        sx={{
          width: '100%',
          boxSizing: 'borderBox',
          lineHeight: '40px',
          listStyle: 'none',
          color: '#4a90e2',
          fontWeight: 500,
          fontSize: '14px',
          position: 'sticy',
          marginTop: '10px',
          backgroundColor: '#ffffff',
          border: 'solid 1px',
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
          const filteredPlaces = places.filter((restaurant) => restaurant.foodType === item.title);
          return (
            <StoreListItems
              key={idx}
              icon={item.icon}
              title={item.title}
              places={filteredPlaces}
              onSelectAddress={onSelectAddress}
              isOpen={openCategoryIndex === idx}
              onClick={() => handleCategoryClick(idx)}
              checkVisitedStore={checkVisitedStore}
            />
          );
        })}
      </List>
    </div>
  );
}

export default StoreInfoBox;
