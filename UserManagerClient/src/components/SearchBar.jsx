import { useState } from 'react';

function SearchBar({ onSearch, onClear }) {
  const [localSearchId, setLocalSearchId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(localSearchId);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <label>Search by ID: </label>
      <input
        type="text"
        value={localSearchId}
        onChange={(e) => setLocalSearchId(e.target.value)}
        placeholder="Enter user id or leave empty..."
      />
      <button type="submit">Search</button>
      <button type="button" onClick={() => { setLocalSearchId(""); onClear(); }}>Clear</button>
    </form>
  );
}

export default SearchBar;
