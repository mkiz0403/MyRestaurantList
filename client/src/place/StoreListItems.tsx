import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Store from './Store';
import { UserStore } from '../models/user.interface';

interface StoreListProps {
  icon: string;
  title: string;
  places: UserStore[];
  onSelectAddress: (address: string) => void;
  isOpen: boolean;
  onClick: () => void;
}

function StoreListItems({ icon, title, places, onSelectAddress, isOpen, onClick }: StoreListProps) {
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
          <Store places={places} onSelectAddress={onSelectAddress} category={title} />
        </List>
      </Collapse>
    </>
  );
}

export default StoreListItems;
