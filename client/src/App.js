import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import logo from './logo.svg';
import './asset/css/reset.css';
import './asset/css/font.css'
import './App.css';
import axios from 'axios';
import Login from './component/Login.js';
import Add from './component/Add.js';
import Card from './component/Card';
import Fail from './component/Fail';
import Edit from './component/Edit'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import Search from './component/Search';

function App() {
  let [ mdLogin, setMdLogin ] = useState(false);
  let [ readData, setReadData ] = useState([]);
  let [ login, setLogin ] = useState(false);
  let [ search, setSearch ] = useState('');
  let [ searchResult, setSearchResult ] = useState([]);
  let [ copy, setCopy ] = useState([]);
  let [ moreCount, setMoreCount ] = useState(7);
  let [ btnOnOff, setBtnOnOff ] = useState(true);
  
  let navigate = useNavigate();

  const openLoginModal= () => {
    setMdLogin(true);
  }

  useEffect(() => {
    axios.get('/showlist').then((result) => {
      setReadData(result.data.reverse());

      let newArray = [];
      for(let i = 0; i <= moreCount; i++) {
        
        if(result.data[i] !== undefined) {
          newArray.push(result.data[i]);
        }
        setCopy(newArray);
      }

      if(result.data.length <= 8 || result.data.length <= moreCount ) {
        setBtnOnOff(false)
      }
    })
    .catch((err) => {
      console.log('실패', err)
    },[])
  
    return () => {
      
    }
  }, [moreCount])

  useEffect(() => {
    axios.get('/logincheck').then((result) => {
      if( result.data == 'login' ) {
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
            <>
              <span className='main-sc-box'>
                <span className='ip-wrap'>
                  <input type="text" id='search-box' onChange={(e) => {
                    setSearch(e.target.value); 
                    }} />
                  <button id='search' onClick={() => {
                    axios.get(`/search?value=${search}`).then((result) => {
                      // console.log(result.data);
                      // console.log(search.length)
                      if(search.length <= 1) {
                        alert('검색어를 두 글자 이상 입력하세요')
                        return false;
                      }
                      if(result.data){
                        setSearchResult(result.data);
                        navigate(`/search?value=${search}`);
                      } else {
                        alert('검색 결과 없음')
                        return false;
                      }
                      
                    }).catch(() => {
                      console.log('실패')
                    })}}>검색</button>
                </span>
              </span>
              <div className='card'>
                {
                  [...copy].slice(0).map((show, i) => {
                    return (
                      <Card show={show} key={show._id} login={login} />
                    )
                  })
                }
                {
                  btnOnOff ?
                    <div className='btn-more' onClick={() => {
                      setMoreCount(moreCount + 8);
                    }}>더보기</div>
                  :
                    null
                }
              </div>
            </>
          } />

          <Route path='/add' element={<Add />} />
          <Route path='/fail' element={<Fail />} />
          <Route path='/edit/:id' element={<Edit readData={readData} />} />
          <Route path='/search' element={<Search login={login} searchResult={searchResult}  />} />
        </Routes>
      
      </div>
  );
}



export default App;
