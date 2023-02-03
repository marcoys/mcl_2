import React, { useState } from 'react';
import axios from 'axios';


function Add() {
  let [ artist, setArtist ] = useState('');
  
  function handleChange(e) {
    setArtist(e.target.value);
    console.log(artist);
  }

  return (
    <div className='container add-wrap'>
      <form action="/add" method='POST'>
        <h1>공연 추가하기</h1>
        <div className='add-box'>
          
          <span className="ip-box">
            <h5>연주자</h5>
            <span className='ip-wrap'>
              <input type="text" name='artist'/>
            </span>
          </span>
          
          <span className="ip-box">
            <h5>공연장</h5> 
            <span className='ip-wrap'>
            <input type="text" name='location'/>
            </span>
          </span>
          
          <span className="ip-box">
            <h5>날짜</h5>
            <span className='ip-wrap'>
              <input type="text" name='date'/>
            </span>
          </span>
          
          <span className="ip-box">
            <h5>시간</h5>
            <span className='ip-wrap'>
              <input type="text" name='time'/>
            </span>
          </span>
          
          <span className="ip-box">
            <h5>좌석</h5>
            <span className='ip-wrap'>
              <input type="text" name='seat'/>
            </span>
          </span>

          <span className="ip-box">
            <h5>가격</h5>
            <span className='ip-wrap'>
              <input type="text" name='price'/>
            </span>
          </span>

          <span className="ip-box">
            <h5>포스터</h5>
            이미지 첨부
          </span>
        </div>

        <button className='btn-ok'>확인</button>
      </form>
    </div>
  )
}

export default Add