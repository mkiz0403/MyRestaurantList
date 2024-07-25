import styled from 'styled-components';

styled;

interface RouletteStoreAddProps {
  onOpen: () => void;
  onClose: () => void;
}

function RouletteStoreAdd({ onClose }: RouletteStoreAddProps) {
  return (
    <>
      <Container>
        <Box>
          <Titel> 맛집 뽑기</Titel>
          <Contents>
            <StoreBox>
              <TextBox>
                <Text>돈비고고</Text>
                <DelButton>삭제</DelButton>
              </TextBox>
              <TextBox>
                <Text>돈비고고2</Text>
                <DelButton>삭제</DelButton>
              </TextBox>
              <TextBox>
                <Text>돈비고고3</Text>
                <DelButton>삭제</DelButton>
              </TextBox>
              <TextBox>
                <Text>돈비고고4</Text>
                <DelButton>삭제</DelButton>
              </TextBox>
              <TextBox>
                <Text>돈비고고5</Text>
                <DelButton>삭제</DelButton>
              </TextBox>
            </StoreBox>
            <ButtonBox>
              <Button type="button" onClick={onClose}>
                취소
              </Button>
              <Button type="submit">돌리기</Button>
              <Button type="submit">초기화</Button>
            </ButtonBox>
          </Contents>
        </Box>
      </Container>
    </>
  );
}
export default RouletteStoreAdd;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  padding: 0;
  margin: auto;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const Box = styled.div`
  width: 30%;
  background-color: white;
  height: 600px;
  border-radius: 10px;
  border: 1px solid #007bff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Titel = styled.h1`
  text-align: center;
  font-size: 30px;
  color: #007bff;
`;

const Contents = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const StoreBox = styled.div`
  width: 100%;
`;

const TextBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 95%;
  height: 50px;
  margin-top: 10px;
  vertical-align: baseline;
`;

const Text = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  color: black;
  margin-left: 5px;
  background-color: lightblue;
  border-radius: 5px;
  border: none;
`;

const DelButton = styled.button`
  width: 15%;
  height: 100%;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  color: white;
  margin-left: 5px;
  margin-right: 5px;
`;

const ButtonBox = styled.div`
  width: 95%;
  display: flex;
  justify-content: space-around;
  margin-top: auto;
  padding-bottom: 10px;
`;

const Button = styled.button`
  width: 30%;
  height: 40px;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  color: white;
  margin-left: 5px;
  margin-right: 5px;
`;
