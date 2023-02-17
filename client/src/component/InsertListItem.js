import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus } from "@fortawesome/free-solid-svg-icons";

function InsertListItem({ program, onRemove, addOpt }) {
  let { id, title } = program;

  return (
    <>
      <li className="ip-box" id={id}>
        <input className='input-txt' type="text" name={addOpt} defaultValue={title} readOnly />
        <FontAwesomeIcon icon={faCircleMinus} className="ip-plus prg-plus" onClick={() => onRemove(id)} />
      </li>
    </>
  )
}

export default InsertListItem