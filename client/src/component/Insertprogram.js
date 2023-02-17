import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useCallback } from 'react';

function Insertprogram({ onInsert }) {
  const [ value, setValue ] = useState('');

  const onChange = useCallback( e => {
    setValue(e.target.value);
  }, [])

  const setInsert = useCallback(e => {
    onInsert(value);
    setValue('')
  }, [onInsert, value])

  return (
    <>
      <li className="ip-box">
        <input className='input-txt' type="text" name="insertTitle" id='add-input' value={value} onChange={onChange} />
        <FontAwesomeIcon icon={faCirclePlus} className="ip-plus prg-plus" onClick={setInsert}/>
      </li>
    </>
  )
}

export default Insertprogram