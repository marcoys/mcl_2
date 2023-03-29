import React, { useCallback, useEffect, useRef, useState } from 'react';
import Insertlist from './Insertlist';
import Insertprogram from './Insertprogram';

function AddInput({addOpt, showList }) {
  const [ array, setArray ] = useState([]);
  
  let totalNumber = showList.artist.length;
  let nextId = useRef(totalNumber);
  console.log(nextId)
  console.log(showList.artist.length)

  for (let i = 0; i <= totalNumber - 1; i++) {
    array.push({
      id: i,
      artist: showList.artist[i],
      title: showList.title[i],
    });
  }

  const [ programs, setPrograms ] = useState(array);

  // 리스트 추가
  const onInsert = useCallback((artist ,title) => {
    let program = {
      id: nextId.current,
      artist,
      title
    }
    setPrograms(programs.concat(program));
    nextId.current += 1;
    console.log(programs)

  },[programs])

  // 해당 리스트 삭제
  const onRemove = useCallback(id => {
      const copy = [...programs];
      const deleted = copy.filter(program => program.id !== id);
      
      setPrograms(deleted);
    },[programs]
  )

  return (
    <>
      {/* 기존 or 추가 되는 리스트 */}
      <Insertlist programs={programs} onRemove={onRemove} addOpt={addOpt} /> 

      {/* 데이터 추가하는 input */}
      <Insertprogram onInsert={onInsert} />
    </>
  );
}

export default AddInput
