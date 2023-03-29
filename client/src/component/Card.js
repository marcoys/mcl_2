import React, { useEffect } from 'react';
import { useState } from 'react';
import Playlist from './Playlist';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Card({ show, login }) {
  const [ fade, setFade ] = useState('');
  const [ program, setProgram ] = useState(show.program);
  const [ anchor, setAnchor ] = useState(show.anchor);
  const [ id, setId ] = useState(show._id);
  const [ modalVisibleId, setModalVisibleId ] = useState('');

  useEffect(() => {
    setFade('end');

  }, [])
  

  const onModalHandler = (id) => {
    setModalVisibleId(id);
    console.log(modalVisibleId);
  }

  const deleteShow = (e) => {
    const clickId = e.currentTarget.id;
    const deletedCard = e.target.closest('ul')
    axios.delete('http://localhost:8080/delete',{ data: { _id : clickId} }).then(() => {
      console.log('삭제완료')
      console.log(clickId);
      deletedCard.setAttribute('style', 'transition: all 0.2s; opacity: 0;')
      setTimeout(() => {
        deletedCard.setAttribute('style', 'display: none;')
      }, 300)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  let navigate = useNavigate();
  
  return (
    <>
      
      <ul className={`start ${fade}`}>
        <li style={{
            background: `url(${process.env.PUBLIC_URL}/images/${show.poster})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
        </li>
        <li style={{ position: 'absolute', right: '0', top: '0'}}>
          {
            login ? <FontAwesomeIcon id={show._id} icon={faCircleXmark} className='btn_list_delete' onClick={deleteShow} /> : null
          }
        </li>
        <li>
          <div className='text-box'>
            <h2>
              {show.date} {show.time}
            </h2>
            <h3>{show.artist}</h3>
            <h4>{show.location}</h4>
            <h4>
              {show.seat}석 {show.price}만원
            </h4>
          </div>
          <div className='btn-box'>
            <div className="btn_prgm" onClick={() => onModalHandler(show._id)}>
              프로그램
            </div>
            {
              login ? <div className='btn_mody' onClick={() => {navigate(`/edit/${show._id}`); }}>수정</div> : null
            }
            {/* 수정기능 추가하기 */}
          </div>
          
        </li>
      </ul>
      <Playlist program={program} anchor={anchor} id={id} modalVisibleId={modalVisibleId} setModalVisibleId={setModalVisibleId} />
    </>
  );
}

export default Card