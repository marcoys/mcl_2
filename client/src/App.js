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
import Fail from './component/Fail';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faRightToBracket } from "@fortawesome/free-solid-svg-icons";

function App() {
  let [ mdLogin, setMdLogin ] = useState(false);
  let [ readData, setReadData ] = useState([]);
  let [ login, setLogin ] = useState(false);
  
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

  useEffect(() => {
    axios.get('/logincheck').then((result) => {
      console.log(result.data);
      if( result.data == 'login' ) {
        console.log('로그인됨')
        setLogin(true);
      }
    })
    return () => {
      console.log('로딩실패')
    }
  }, [])
  

  return (
      <div className="App notosanskr">

        {
          mdLogin === true ? <Login mdLogin={mdLogin} setMdLogin={setMdLogin} /> : null
        }

        <header>
          <h1 onClick={() => {navigate('/')}}>My Classic List</h1>
          {
            login == false ? 
            <FontAwesomeIcon icon={faRightToBracket} className='btn_plus' onClick={openLoginModal}/>
            :
            <FontAwesomeIcon icon={faSquarePlus} className='btn_plus' onClick={() => {navigate('/add')}}/>
          }
          
        </header>

        <Routes>
          <Route path='/' element={
            <div className='card'>
              {
                [...readData].slice(0).reverse().map((show, i) => {
                  return (
                    <Card show={show} key={show._id} login={login} />
                  )
                })
              }
            </div>
          } />

          <Route path='/add' element={<Add />} />
          <Route path='/fail' element={<Fail />} />
        </Routes>
      
      </div>
  );
}



export default App;
