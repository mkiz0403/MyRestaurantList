import { useState } from 'react';
import { Card, CardHeader, CardActions, IconButton, Collapse, CardContent, CardMedia, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { UserStore } from '../models/user.interface';

interface RestaurantsInfoProps {
  places: UserStore[];
  onSelectAddress: (address: string) => void;
  category: string;
}

const RestaurantsItem = ({ places, onSelectAddress, category }: RestaurantsInfoProps) => {
  const [expanded, setExpanded] = useState<number | null>(null);

  const handleExpandClick = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <div>
      {places
        .filter((restaurant) => restaurant.foodType === category)
        .map((restaurant, idx) => (
          <Card sx={{ maxWidth: 345, marginBottom: 2 }} key={idx}>
            <CardHeader title={restaurant.placeName} subheader="최근방문일 : 2024.6.25" />
            <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <IconButton aria-label="add to favorites">
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
                <CardMedia component="img" height="194" image={restaurant.imageUrl} alt={restaurant.placeName} />
                <Typography variant="body2" color="text.secondary">
                  <strong>음식 종류:</strong> {restaurant.foodType}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>리뷰:</strong> {restaurant.review}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>주소:</strong>
                  <span
                    onClick={() => onSelectAddress(restaurant.address)}
                    style={{ cursor: 'pointer', color: 'blue' }}
                  >
                    {restaurant.address}
                  </span>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>방문 횟수:</strong> {restaurant.visitsCount}회
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        ))}
    </div>
  );
};

export default RestaurantsItem;
