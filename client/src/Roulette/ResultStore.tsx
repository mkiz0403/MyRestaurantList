import styled from 'styled-components';
import { UserStore } from '../models/user.interface';

interface ResultStoreProps {
  result: string | null;
  spinRoulette: () => void;
  onClose: () => void;
  userStore: UserStore[];
}

function ResultStore({ result, spinRoulette, onClose, userStore }: ResultStoreProps) {
  const store = userStore.find((store) => store.placeName === result);

  return (
    <>
      <Container>
        <ItemContainer>
          <Title>오늘의 맛집 Pick 🍽️</Title>
          <MainItem>
            <img src={store?.imageUrl} alt={store?.placeName} />
          </MainItem>
          <ItemHeading>{store?.placeName}</ItemHeading>
          <CardInfo>
            <span>총 방문 횟수: {store?.visitedDate ? store.visitedDate.length : 0}</span>
            <span>
              최근 방문일:{' '}
              {store?.visitedDate && store.visitedDate.length > 0
                ? store.visitedDate[store.visitedDate.length - 1]
                : '없음'}
            </span>
          </CardInfo>
          <ItemDescription>리뷰 : {store?.review}</ItemDescription>
          <span>주소 : {store?.address}</span>
          <ButtonBox>
            <Button type="submit" onClick={spinRoulette}>
              다시 돌리기
            </Button>
            <Button type="button" onClick={onClose}>
              닫기
            </Button>
          </ButtonBox>
        </ItemContainer>
      </Container>
    </>
  );
}

export default ResultStore;

const Container = styled.div`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
`;

const Title = styled.h1`
  text-transform: capitalize;
  text-align: center;
  margin: 1rem 0;
`;

const ItemContainer = styled.div`
  background-color: #fff;
  width: 20rem;
  margin: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
`;

const MainItem = styled.div`
  width: 100%;
  display: block;
  margin: 0 auto;

  img {
    width: 100%;
    border-radius: 1rem;
  }
`;

const ItemHeading = styled.h2`
  text-transform: capitalize;
  text-align: center;
  margin-top: 1rem;
`;

const CardInfo = styled.div`
  margin: 1rem 0;
  font-size: 14px;
  color: #666;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ItemDescription = styled.p`
  margin: 0.5rem 0;
  font-size: 0.9rem;
  font-weight: 200;
`;

// const ButtonBox = styled.div`
//   display: flex;
//   justify-content: space-between;
//   gap: 1rem;
//   margin-top: 1rem;
// `;
const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  padding-bottom: 10px;
`;

// const ItemCartBtn = styled.button`
//   flex: 1;
//   border: none;
//   background-color: rgb(200, 142, 254);
//   color: #fff;
//   padding: 0.5rem 1rem;
//   border-radius: 2rem;
//   font-size: 1rem;
//   cursor: pointer;
//   transition: background-color 0.3s ease;

const Button = styled.button`
  width: 100%;
  height: 40px;
  background-color: #ededed;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  color: black;
  margin-left: 5px;
  margin-right: 5px;

  &:hover {
    color: white;
    background-color: #007bff;
  }
`;
