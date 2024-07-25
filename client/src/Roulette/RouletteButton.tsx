import { useState } from 'react';
import styled from 'styled-components';
import RouletteStoreAdd from './RouletteStoreAdd';

function RouletteButton() {
  const [openRoulette, setOpenRoulette] = useState(false);

  function handleRouletteON() {
    setOpenRoulette(true);
  }

  function handleRouletteOff() {
    setOpenRoulette(false);
  }

  return (
    <>
      <Button onClick={handleRouletteON}>맛집 뽑기 😋</Button>
      {openRoulette && <RouletteStoreAdd onOpen={handleRouletteON} onClose={handleRouletteOff} />}
    </>
  );
}

export default RouletteButton;

const Button = styled.button`
  width: 140px;
  height: 50px;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  color: white;
  position: absolute;
  top: 10px;
  left: 55rem;
  z-index: 10;
`;
