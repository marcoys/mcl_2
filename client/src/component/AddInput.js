import React, { useCallback, useRef, useState } from 'react';
import Insertlist from './Insertlist';
import Insertprogram from './Insertprogram';

function createProgram() {
  const array = [];
  let totalNumber = array.length;
  for ( let i = 0; i <= totalNumber - 1; i++ ) {
    array.push({
      id: i,
      artist: '',
      title: `제목 ${i}`
    });
  }
  return array;
}

function AddInput({addOpt}) {
  const [ programs, setPrograms ] = useState(createProgram);

  let nextId = useRef(0);

  const onInsert = useCallback((artist ,title) => {
    let program = {
      id: nextId.current,
      artist,
      title
    }
    setPrograms(programs.concat(program));
    nextId.current += 1;

  },[programs])

  const onRemove = useCallback(id => {
      const copy = [...programs];
      const deleted = copy.filter(program => program.id !== id);
      
      setPrograms(deleted);
    },[programs]
  )

  return (
    <>
      <Insertlist programs={programs} onRemove={onRemove} addOpt={addOpt} />
      <Insertprogram onInsert={onInsert} />
    </>
  );
}

export default AddInput
