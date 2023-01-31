import React, { useState } from 'react';
import axios from 'axios';


function Add() {
  let [ artist, setArtist ] = useState('');
  let url = '/data/data.json';
  

  function handleChange(e) {
    setArtist(e.target.value);
    console.log(artist);
  }

  return (
    <div>
      <input type="text" onChange={handleChange} />
      <button>확인</button>
    </div>
  )
}

export default Add