import { useState } from 'react';

interface SearchStoreProps {
  onSearch: (searchTerm: string) => void;
}
function SearchStore({ onSearch }: SearchStoreProps) {
  const [searchTerm, setSearchTerm] = useState('');

  function handleSearch() {
    onSearch(searchTerm);
  }

  return (
    <div
      className="search-bar"
      style={{
        position: 'absolute',
        top: '10px',
        left: '15rem',
        zIndex: 10,
        background: 'white',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
      }}
    >
      <input
        id="address"
        type="text"
        placeholder="음식점 검색"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>검색</button>
    </div>
  );
}
export default SearchStore;
