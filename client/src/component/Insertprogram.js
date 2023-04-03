import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useCallback } from 'react';

function Insertprogram({ onInsert }) {
  const [ artist, setArtist ] = useState('');
  const [ value, setValue ] = useState('');

  const onChange1 = useCallback( e => {
    setArtist(e.target.value);
  }, [])
  const onChange2 = useCallback( e => {
    setValue(e.target.value);
  }, [])

  const setInsert = useCallback(e => {
    onInsert(artist, value);
    setArtist('');
    setValue('');
  }, [onInsert, artist, value])

  return (
    <>
      <li className="ip-box">
        <input type="text" value={artist} onChange={onChange1} placeholder={'작곡가'} />
        <input className='input-txt' type="text" name="insertTitle" id='add-input' value={value} onChange={onChange2} placeholder={'곡명'} />
        <FontAwesomeIcon icon={faCirclePlus} className="ip-plus prg-plus" onClick={setInsert}/>
      </li>
    </>
  )
}

export default Insertprogram