import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import logo from './logo.svg';
import './asset/css/reset.css';
import './asset/css/font.css'
import './App.css';
import axios from 'axios';
import Login from './component/Login.js';
import Add from './component/Add.js';
import Playlist from './component/Playlist.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function App() {
  let [ mdLogin, setMdLogin ] = useState(false);
  let [ playList, setPlayList ] = useState(false);
  let [ readData, setReadData ] = useState([]);
  let [ blBg, setBlBg ] = useState('');
  
  let navigate = useNavigate();


  const openModal = () => {
    setBlBg('mdon');
    setMdLogin(true);
    document.querySelector('body').style.overflow = 'hidden';
  }
  const closeModal = () => {
    setBlBg('');
    setMdLogin(false);
    document.querySelector('body').style.overflow = '';
  }
  const openModal2 = () => {
    setBlBg('mdon');
    setPlayList(true);
    document.querySelector('body').style.overflow = 'hidden';
  }
  const closeModal2 = () => {
    setBlBg('');
    setPlayList(false);
    document.querySelector('body').style.overflow = '';
  }

  useEffect(() => {
    axios.get('http://localhost:8080/showlist').then((result) => {
      console.log(result.data);
      setReadData(result.data)
    })
    .catch(() => {
      console.log('실패')
    },[])
  
    return () => {
      
    }
  }, [])

  return (
      <div className="App notosanskr">
        <div className={`black-bg `+blBg} />
        
        {
          mdLogin === true ? <Login open={openModal} close={closeModal}  onoff={mdLogin} /> : null
        }

        <header>
          <h1 onClick={() => {navigate('/')}}>My Classic List</h1>
          <FontAwesomeIcon icon={faPlus} className='btn_plus' onClick={() => {navigate('/add')}}/>
        </header>

        <Routes>
          <Route path='/' element={
            <div className='card'>
              {
                [...readData].slice(0).reverse().map((a, i) => {
                  return (
                    <Fragment key={i}>
                      <ul>
                        <li style={{ background: `url(${process.env.PUBLIC_URL}/images/${a.poster})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                          <img src={``} alt="" />
                        </li>
                        <li>
                          <h2>{a.date} {a.time}</h2>
                          <h3>{a.artist}</h3>
                          <h4>{a.location}</h4>
                          <h4>{a.seat}석 {a.price}만원</h4>
                          <div className='btn_prgm' onClick={openModal2}><p>프로그램</p></div>
                        </li>
                      </ul>
                      {
                        playList === true ? <Playlist open={openModal2} close={closeModal2} onoff={playList} /> : null
                      }
                    </Fragment>
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
