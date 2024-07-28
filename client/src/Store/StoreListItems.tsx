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
  checkVisitedStore: (storeId: string, visitDate: string) => void;
  addToRoulette: (placeName: string) => void;
  expandedStore: string | null;
  setExpandedStore: (storeId: string | null) => void;
  userEmail: string;
  token: string;
  onUpdatePlaces: (updatedPlaces: UserStore[]) => void;
  handleDeleteStore: (userEmail: string, storeId: string, token: string) => Promise<UserStore | undefined>;
}

function StoreListItems({
  icon,
  title,
  places,
  onSelectAddress,
  isOpen,
  onClick,
  checkVisitedStore,
  addToRoulette,
  expandedStore,
  setExpandedStore,
  userEmail,
  token,
  onUpdatePlaces,
  handleDeleteStore,
}: StoreListProps) {
  return (
    <>
      <div style={{ marginTop: '20px' }}>
        <ListItemButton onClick={onClick}>
          <ListItemIcon>
            <div>{icon}</div>
          </ListItemIcon>
          <ListItemText primary={title} />
          {isOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Store
              places={places}
              onSelectAddress={onSelectAddress}
              category={title}
              checkVisitedStore={checkVisitedStore}
              addToRoulette={addToRoulette}
              expandedStore={expandedStore}
              setExpandedStore={setExpandedStore}
              userEmail={userEmail}
              token={token}
              onUpdatePlaces={onUpdatePlaces}
              handleDeleteStore={handleDeleteStore}
            />
          </List>
        </Collapse>
      </div>
    </>
  );
}

export default StoreListItems;
