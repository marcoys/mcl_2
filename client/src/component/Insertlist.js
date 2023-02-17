import React from 'react';
import InsertListItem from './InsertListItem';

function Insertlist({ programs, onRemove, addOpt }) {
  return (
    <>
      {
        programs.map(program =>  (
            <InsertListItem program={program} onRemove={onRemove} addOpt={addOpt} key={program.id} />
        ))
      }
    </>
  );
}

export default Insertlist;
