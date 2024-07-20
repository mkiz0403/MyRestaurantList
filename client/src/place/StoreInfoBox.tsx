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
  visitsCount?: number;
}

interface StoresListProps {
  places: Stores[];
  onSelectAddress: (address: string) => void;
  onOpenCreateStore: () => void;
}

const categories = [
  { icon: '🍲', title: '한식' },
  { icon: '🍕', title: '양식' },
  { icon: '🍣', title: '일식' },
  { icon: '🥟', title: '중식' },
  { icon: '🍽️', title: '기타' },
];

function StoreInfoBox({ places, onSelectAddress, onOpenCreateStore }: StoresListProps) {
  const [openCategoryIndex, setOpenCategoryIndex] = useState<number | null>(null);

  function handleCategoryClick(index: number) {
    setOpenCategoryIndex(openCategoryIndex === index ? null : index);
  }

  return (
    <div>
      <List
        sx={{
          marginTop: '10px',
          width: '98%',
          maxHeight: '500px',
          overflow: 'auto',
          bgcolor: 'background.paper',
          borderInlineColor: 'blue',
          padding: '8px',
          borderTop: '1px solid #e0e0e0',
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            sx={{ backgroundColor: '#4a90e2', borderRadius: '10px', color: 'white' }}
          >
            <strong>나의 맛집 리스트</strong>
          </ListSubheader>
        }
      >
        <Button
          sx={{
            marginLeft: '10px',
            marginTop: '4px',
            width: '18rem',
            height: '48px',
            borderRadius: '10px',
            paddingLeft: '16px',
            paddingRight: '16px',
            backgroundColor: 'white',
            border: '1px solid rgba(0, 0, 0, 0.5)',
          }}
          onClick={onOpenCreateStore}
        >
          맛집 추가하기 +
        </Button>
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
            />
          );
        })}
      </List>
    </div>
  );
}

export default StoreInfoBox;
