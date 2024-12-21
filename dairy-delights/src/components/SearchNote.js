import React from 'react';
import { Search } from '@mui/icons-material';

export default function SearchNote({ onSearchNote, searchText }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '230px',position:'relative' }}>
      <Search style={{ color: 'gray',fontSize: '20px',marginBottom:'-90px' }} />
      <input
        style={{
          width: '200px',
          height: '30px', // Adjusted height
          backgroundColor:'wheat',
          border: '1px solid lightgray',
          borderRadius: '20px',
          padding: '0 10px', // Padding for input
          fontSize: '14px',
          marginBottom:'-90px'
        }}
        type="text"
        value={searchText}
        placeholder="Search for Product"
        onChange={onSearchNote}
      />
    </div>
  );
}
