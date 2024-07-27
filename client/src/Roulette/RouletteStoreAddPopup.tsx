import styled from 'styled-components';
interface RouletteStoreAddPopupProps {
  stores: string[];
  setStore: React.Dispatch<React.SetStateAction<string[]>>;
  onClose: () => void;
  onSpin: () => void;
}

function RouletteStoreAddPopup({ onClose, stores, setStore, onSpin }: RouletteStoreAddPopupProps) {
  function removeStore(store: string) {
    setStore(stores.filter((i) => i !== store));
  }

  function resetRoulette() {
    setStore([]);
  }

  return (
    <>
      <Container>
        <Box>
          <Title> 맛집 뽑기</Title>
          <Contents>
            <StoreBox>
              {stores.map((store, idx) => (
                <TextBox key={idx}>
                  <Text>{store}</Text>
                  <DelButton onClick={() => removeStore(store)}>삭제</DelButton>
                </TextBox>
              ))}
            </StoreBox>
            <ButtonBox>
              <Button type="button" onClick={resetRoulette}>
                초기화
              </Button>
              <Button type="button" onClick={onSpin}>
                돌리기
              </Button>
              <Button type="button" onClick={onClose}>
                취소
              </Button>
            </ButtonBox>
          </Contents>
        </Box>
      </Container>
    </>
  );
}
export default RouletteStoreAddPopup;

const Container = styled.div`
  position: absolute;
  position: fixed;
  top: 70px;
  right: 4rem;
  padding: 0;
  margin: auto;
  width: 300px;
  background-color: white;
  border-radius: 10px;
  border: 1px solid #007bff;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 20;
`;

const Box = styled.div`
  width: 100%;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 16px;
  color: #007bff;
`;

const Contents = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StoreBox = styled.div`
  width: 100%;
`;

const TextBox = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
`;

const Text = styled.div`
  width: 100%;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  color: black;
  background-color: #ededed;
  border-radius: 5px;
  border: none;
`;

const DelButton = styled.button`
  width: 38px;
  height: 38px;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  font-size: 12px;
  color: white;
  margin-left: 8px;
`;

const ButtonBox = styled.div`
  display: flex;
  margin-top: 20px;
  gap: 8px;
  padding: 10px 0;
`;

const Button = styled.button`
  width: 80px;
  height: 38px;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  color: white;
`;
