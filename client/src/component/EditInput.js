import React, { useCallback, useEffect, useRef, useState } from 'react';
import Insertlist from './Insertlist';
import Insertprogram from './Insertprogram';

function AddInput({addOpt, artist, title }) {
  const [ totalNumber, setTotalNumber ] = useState('');
  const nextId = useRef();

  // artist props는 배열
  useEffect(() => {
    setTotalNumber(Object.keys(artist).length);
  }, [artist])

  
  // 부모 컴포넌트에서 db 받아와서 리스트로 뿌려줌
  const [ array, setArray ] = useState([]);
  for (let i = 0; i < totalNumber; i++) {
    array.push({
      id: i,
      artist: artist[i],
      title: title[i],
    });
  }
  nextId.current = array.length

  // 리스트 추가
  const [ programs, setPrograms ] = useState(array);

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

// 리렌더링 방지
export default React.memo(AddInput) 
