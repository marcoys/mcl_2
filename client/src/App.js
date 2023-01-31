import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import logo from './logo.svg';
import './asset/css/reset.css';
import './asset/css/font.css'
import './App.css';
import axios from 'axios';
import Login from './component/Login.js';
import Add from './component/Add.js';
import Playlist from './component/Playlist.js';
import data from './data.json';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function App() {
  let [ mdLogin, setMdLogin ] = useState(false);
  let [ playList, setPlayList ] = useState(false);
  let [ cardData, setCardData ] = useState(data);
  let [ readData, setReadData ] = useState([]);
  
  let navigate = useNavigate();


  const openModal = () => {
    setMdLogin(true);
  }
  const closeModal = () => {
    setMdLogin(false);
  }
  const openModal2 = () => {
    setPlayList(true);
  }
  const closeModal2 = () => {
    setPlayList(false);
  }

  const test = () => {
    axios.get('http://localhost:8080/showlist').then((result) => {
      console.log(result);
    })
    .catch(() => {
      console.log('실패')
    })
  }

  return (
      <div className="App notosanskr">
        
        {
          mdLogin === true ? <Login open={openModal} close={closeModal}  onoff={mdLogin} /> : null
        }

        {
          playList === true ? <Playlist open={openModal2} close={closeModal2} onoff={playList} /> : null
        }
        <header>
          <h1 className='ghanachoco' onClick={() => {navigate('/')}}>My Classic List</h1>
          <FontAwesomeIcon icon={faPlus} className='btn_plus' onClick={ openModal }/>
        </header>

        <Routes>
          <Route path='/' element={
            <div className='card'>
              {
                cardData.map((a, i) => {
                  return (
                    <ul key={i}>
                      <li>
                        <img src={`${process.env.PUBLIC_URL}/images/chosungjin.jpg`} alt="" />
                      </li>
                      <li>
                        <h2>2020-11-13 7:30PM</h2>
                        <h3>{a.artist}</h3>
                        <h4>{cardData[i].location}</h4>
                        <h4>{cardData[i].seat}석 {cardData[i].price}만원</h4>
                        <div className='btn_prgm' onClick={openModal2}><p>프로그램</p></div>
                      </li>
                    </ul>
                  )
                })
              }
          </div>
          } />

          <Route path='/add' element={<Add />} />
        </Routes>
      
      </div>
  );
}



export default App;
