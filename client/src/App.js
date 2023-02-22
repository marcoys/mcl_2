import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import logo from './logo.svg';
import './asset/css/reset.css';
import './asset/css/font.css'
import './App.css';
import axios from 'axios';
import Login from './component/Login.js';
import Add from './component/Add.js';
import Card from './component/Card';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";

function App() {
  let [ mdLogin, setMdLogin ] = useState(false);
  let [ playList, setPlayList ] = useState(false);
  let [ readData, setReadData ] = useState([]);
  
  let navigate = useNavigate();

  const openLoginModal= () => {
    setMdLogin(true);
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

        {
          mdLogin === true ? <Login mdLogin={mdLogin} setMdLogin={setMdLogin} /> : null
        }

        <header>
          <h1 onClick={() => {navigate('/')}}>My Classic List</h1>
          {/* <FontAwesomeIcon icon={faSquarePlus} className='btn_plus' onClick={() => {navigate('/add')}}/> */}
          <FontAwesomeIcon icon={faSquarePlus} className='btn_plus' onClick={openLoginModal}/>
        </header>

        <Routes>
          <Route path='/' element={
            <div className='card'>
              {
                [...readData].slice(0).reverse().map((show, i) => {
                  return (
                    <Card show={show} key={show._id} playList={playList} />
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
