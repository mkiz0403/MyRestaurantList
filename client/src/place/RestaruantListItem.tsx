
import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import RestaurantsItem from './RestaurantsItem';

interface Restaurant {
  imageUrl: string;
  foodType: string;
  placeName: string;
  review: string;
  address: string;
  visitsCount: number;
}

interface RestaruantListItemProps {
  icon: string;
  title: string;
  places: Restaurant[];
  onSelectAddress: (address: string) => void;
  isOpen: boolean;
  onClick: () => void;
}

function RestaruantListItem({ icon, title, places, onSelectAddress, isOpen, onClick }: RestaruantListItemProps) {
  return (
    <>
      <ListItemButton onClick={onClick}>
        <ListItemIcon>
          <div>{icon}</div>
        </ListItemIcon>
        <ListItemText primary={title} />
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <RestaurantsItem places={places} onSelectAddress={onSelectAddress} category={title} />
        </List>
      </Collapse>
    </>
  );
}

export default RestaruantListItem;
