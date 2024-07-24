import { useState } from 'react';
import { Card, CardHeader, CardActions, IconButton, Collapse, CardContent, CardMedia, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { UserStore } from '../models/user.interface';

interface StoreInfoProps {
  places: UserStore[];
  onSelectAddress: (address: string) => void;
  category: string;
  checkVisitedStore: (storeId: string, visitDate: string) => void;
}

const Store = ({ places, onSelectAddress, category, checkVisitedStore }: StoreInfoProps) => {
  const [expanded, setExpanded] = useState<number | null>(null);

  const handleExpandClick = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  const handleFavoriteClick = (storeId: string) => {
    const visitDate = new Date().toISOString();
    checkVisitedStore(storeId, visitDate);
  };

  return (
    <div>
      {places
        .filter((store) => store.foodType === category)
        .map((store, idx) => (
          <Card sx={{ marginLeft: '10px', paddingLeft: '20px', maxWidth: 345, marginBottom: 2 }} key={idx}>
            <CardHeader title={store.placeName} subheader={`최근방문일 : ${store.lastVisit || '없음'}`} />
            <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <IconButton aria-label="add to favorites" onClick={() => handleFavoriteClick(store.storeId)}>
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              <IconButton
                sx={{ marginLeft: 'auto' }}
                onClick={() => handleExpandClick(idx)}
                aria-expanded={expanded === idx}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={expanded === idx} timeout="auto" unmountOnExit>
              <CardContent>
                <CardMedia component="img" height="194" image={store.imageUrl} alt={store.placeName} />
                <Typography variant="body2" color="text.secondary">
                  <strong>음식 종류:</strong> {store.foodType}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>리뷰:</strong> {store.review}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>주소:</strong>
                  <span onClick={() => onSelectAddress(store.address)} style={{ cursor: 'pointer', color: 'blue' }}>
                    {store.address}
                  </span>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>방문 횟수:</strong> {store.visitedDate}회
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        ))}
    </div>
  );
};

export default Store;
