import { useState } from 'react';
import { Card, CardActions, IconButton, Collapse, CardContent, CardMedia, Typography } from '@mui/material';
import { UserStore } from '../models/user.interface';
import styled from 'styled-components';
import UpdateStore from './UpdateStore';

interface StoreInfoProps {
  places: UserStore[];
  onSelectAddress: (address: string) => void;
  category: string;
  checkVisitedStore: (storeId: string, visitDate: string) => void;
  addToRoulette: (placeName: string) => void;
  expandedStore: string | null;
  setExpandedStore: (storeId: string | null) => void;
  onUpdatePlaces: (updatedPlaces: UserStore[]) => void;
  userEmail: string;
  token: string;
  handleDeleteStore: (userEmail: string, storeId: string, token: string) => Promise<UserStore | undefined>;
}

function Store({
  places,
  onSelectAddress,
  category,
  checkVisitedStore,
  addToRoulette,
  expandedStore,
  setExpandedStore,
  onUpdatePlaces,
  userEmail,
  token,
  handleDeleteStore,
}: StoreInfoProps) {
  const [openUpdateStore, setOpenUpdateStore] = useState<string | null>(null);

  const handleExpandClick = (index: number, storeId: string) => {
    setExpandedStore(expandedStore === storeId ? null : storeId);
    if (expandedStore !== storeId) {
      setTimeout(() => {
        document.getElementById(`store-card-${index}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  };

  function handleVisitedClick(storeId: string) {
    const date = new Date();
    const visitDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split('T')[0];
    checkVisitedStore(storeId, visitDate);
    alert(`${visitDate} 방문했어요!`);
  }

  function handleAddToRoulette(placeName: string) {
    addToRoulette(placeName);
  }

  function handleUpdateStoreOpen(storeId: string) {
    setOpenUpdateStore(storeId);
  }

  async function handleDelStore(storeId: string) {
    if (window.confirm('정말로 이 스토어를 삭제하시겠습니까?')) {
      try {
        await handleDeleteStore(userEmail, storeId, token);
        const updatedPlaces = places.filter((place) => place.storeId !== storeId);
        onUpdatePlaces(updatedPlaces);
        alert('스토어가 성공적으로 삭제되었습니다.');
      } catch (error) {
        console.error('스토어 삭제 중 오류가 발생했습니다:', error);
        alert('스토어 삭제에 실패했습니다.');
      }
    }
  }

  return (
    <StoreContainer>
      {places
        .filter((store) => store.foodType === category)
        .map((store, idx) => (
          <Card
            id={`store-card-${idx}`}
            sx={{ maxWidth: 345, marginBottom: 2, marginRight: '4px' }}
            key={store.storeId}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h2 style={{ fontSize: '16px', padding: '12px 8px', margin: '0' }}> {store.placeName} </h2>
              <CardActions disableSpacing sx={{ padding: '0 8px' }}>
                <IconButton
                  sx={{
                    marginLeft: 'auto',
                    transition: 'transform 0.3s',
                    fontSize: '12px',
                    borderRadius: '10px',
                  }}
                  onClick={() => handleExpandClick(idx, store.storeId)}
                  aria-expanded={expandedStore === store.storeId}
                  aria-label="show more"
                >
                  {expandedStore === store.storeId ? '닫기' : '자세히 보기'}
                </IconButton>
              </CardActions>
            </div>
            <ButtonBox>
              <VisitedButton onClick={() => handleVisitedClick(store.storeId)}>방문했어요 ❤️</VisitedButton>
              <AddRulette onClick={() => handleAddToRoulette(store.placeName)}>뽑기 추가 ➕</AddRulette>
            </ButtonBox>
            <Collapse in={expandedStore === store.storeId} timeout="auto" unmountOnExit>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <CardMedia
                  component="img"
                  height="194"
                  sx={{ borderRadius: '10px', marginBottom: '10px' }}
                  image={store.imageUrl}
                  alt={store.placeName}
                />
                <Typography variant="body2" color="text.secondary">
                  <strong>음식 종류 :</strong> {store.foodType}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>총 방문 횟수 : </strong> {store.visitedDate?.length || 0} 회
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>최근 방문일 : </strong>
                  {store.visitedDate && store.visitedDate.length > 0
                    ? store.visitedDate[store.visitedDate.length - 1]
                    : '없음'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>주소 : </strong>
                  <span onClick={() => onSelectAddress(store.address)} style={{ cursor: 'pointer', color: 'blue' }}>
                    {store.address}
                  </span>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>매장 메모</strong>
                  <div style={{ border: '1px solid #ededed', borderRadius: '5px', padding: '0 8px', marginTop: '4px' }}>
                    <p>{store.review}</p>
                  </div>
                </Typography>
                {/* <Typography variant="body2" color="text.secondary">
                  <strong>방문일</strong>
                  <ol>
                    {store.visitedDate && store.visitedDate.length > 0
                      ? store.visitedDate
                          ?.sort((a, b) => (a > b ? -1 : 1))
                          .map((date, index) => <li key={index}>{date}</li>)
                      : '없음'}
                  </ol>
                </Typography> */}
                <ButtonBox>
                  <UpdateButton onClick={() => handleUpdateStoreOpen(store.storeId)}>수정 하기</UpdateButton>
                  {openUpdateStore === store.storeId && (
                    <UpdateStore
                      store={store}
                      userEmail={userEmail}
                      token={token}
                      onClose={() => setOpenUpdateStore(null)}
                      onUpdate={(updatedStore) => {
                        const updatedPlaces = places.map((place) =>
                          place.storeId === updatedStore.storeId ? updatedStore : place,
                        );
                        onUpdatePlaces(updatedPlaces);
                      }}
                    />
                  )}
                  <DeleteButton onClick={() => handleDelStore(store.storeId)}>삭제하기</DeleteButton>
                </ButtonBox>
              </CardContent>
            </Collapse>
          </Card>
        ))}
    </StoreContainer>
  );
}

export default Store;

const StoreContainer = styled.div`
  max-height: 80vh;
  overflow-y: auto;
`;
const ButtonBox = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  padding: 8px;
`;
const VisitedButton = styled.button`
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #4a90e2;
    color: white;
  }
`;

const AddRulette = styled.button`
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #4a90e2;
    color: white;
  }
`;

const UpdateButton = styled.button`
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: none;
  margin-top: 8px;
  cursor: pointer;
  &:hover {
    background-color: #4a90e2;
    color: white;
  }
`;
const DeleteButton = styled.button`
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: none;
  margin-top: 8px;
  cursor: pointer;
  &:hover {
    background-color: #4a90e2;
    color: white;
  }
`;
