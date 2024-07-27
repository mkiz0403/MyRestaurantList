import { useState } from 'react';
import styled from 'styled-components';
import RouletteStoreAddPopup from './RouletteStoreAddPopup';
import ResultStore from './ResultStore';
import { UserStore } from '../models/user.interface';

interface RouletteButtonProps {
  userStore: UserStore[];
  stores: string[];
  setStore: React.Dispatch<React.SetStateAction<string[]>>;
}

function RouletteButton({ stores, setStore, userStore }: RouletteButtonProps) {
  const [openRoulette, setOpenRoulette] = useState(true);
  const [result, setResult] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  function handleRouletteON() {
    setOpenRoulette(true);
  }

  function handleRouletteOff() {
    setOpenRoulette(false);
    setStore([]);
  }

  function handleResultClose() {
    setShowResult(false);
    setResult(null);
    setStore([]);
  }

  function spinRoulette() {
    if (stores.length > 0) {
      const randomIndex = Math.floor(Math.random() * stores.length);
      setResult(stores[randomIndex]);
      setShowResult(true);
      setOpenRoulette(false);
    } else {
      alert('룰렛에 음식점을 추가해 주세요.');
    }
  }

  return (
    <>
      <Button onClick={handleRouletteON}>맛집 뽑기 😋</Button>
      {openRoulette && (
        <RouletteStoreAddPopup stores={stores} setStore={setStore} onClose={handleRouletteOff} onSpin={spinRoulette} />
      )}
      {showResult && (
        <ResultStore result={result} spinRoulette={spinRoulette} onClose={handleResultClose} userStore={userStore} />
      )}
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
  top: 1rem;
  right: 8rem;
  z-index: 10;
  position: fixed;
`;
