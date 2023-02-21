import React, { useEffect } from 'react';
import { useState } from 'react';
import Playlist from './Playlist';

function Card({ show, playList }) {
  const [ program, setProgram ] = useState(show.program);
  const [ anchor, setAnchor ] = useState(show.anchor);
  const [ id, setId ] = useState(show._id);
  const [ modalVisibleId, setModalVisibleId ] = useState('');

  const onModalHandler = (id) => {
    setModalVisibleId(id);
    console.log(modalVisibleId)
  }

  
  return (
    <>
      <ul>
        <li style={{
            background: `url(${process.env.PUBLIC_URL}/images/${show.poster})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
        </li>
        <li>
          <h2>
            {show.date} {show.time}
          </h2>
          <h3>{show.artist}</h3>
          <h4>{show.location}</h4>
          <h4>
            {show.seat}석 {show.price}만원
          </h4>
          <div className="btn_prgm" onClick={() => onModalHandler(show._id)}>
            <p>프로그램</p>
          </div>
        </li>
      </ul>
      <Playlist program={program} anchor={anchor} id={id} modalVisibleId={modalVisibleId} setModalVisibleId={setModalVisibleId} />
    </>
  );
}

export default Card