import React from 'react';
import Playlist from '../pages/Playlist.js';

function Card() {
  return (
    <div className='card'>
      <ul>
        <li>
          <img src={`${process.env.PUBLIC_URL}/images/chosungjin.jpg`} alt="" />
        </li>
        <li>
          <h2>2020-11-13 7:30PM</h2>
          <h3>조성진</h3>
          <h4>성남아트센터</h4>
          <h4>R석 9만원</h4>
          <div className='btn_prgm'><p>프로그램</p></div>
        </li>
      </ul>

      <ul>
        <li>
          <img src={`${process.env.PUBLIC_URL}/images/chosungjin.jpg`} alt="" />
        </li>
        <li>
          <h2>2020-11-13 7:30PM</h2>
          <h3>조성진</h3>
          <h4>성남아트센터</h4>
          <h4>R석 9만원</h4>
          <div className='btn_prgm'><p>프로그램</p></div>
        </li>
      </ul>

      <ul>
        <li>
          <img src={`${process.env.PUBLIC_URL}/images/chosungjin.jpg`} alt="" />
        </li>
        <li>
          <h2>2020-11-13 7:30PM</h2>
          <h3>조성진</h3>
          <h4>성남아트센터</h4>
          <h4>R석 9만원</h4>
          <div className='btn_prgm'><p>프로그램</p></div>
        </li>
      </ul>
    </div>
  )
}

export default Card