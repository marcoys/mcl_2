import React, { useEffect, useState } from 'react';

function Playlist({ program, anchor, id, modalVisibleId ,setModalVisibleId }) {
  const closeModal = () => {
    setModalVisibleId('')
  }

  return (
    <>
      <div className={modalVisibleId === id ? 'black-bg mdon' : 'black-bg'} ></div>
      <div className={modalVisibleId === id ? 'modal_program on' : 'modal_program off' } >
        <table className="p_list">
          <caption>프로그램</caption>
          <tbody>
              {
                program.artist && program.artist.map((a, i) => {
                  return (
                    <tr key={i}>
                      <th>{program.artist[i]}</th>
                      <td>{program.title[i]}</td>
                    </tr>
                  )
                })
              }
            </tbody>
        </table>

        <table className="p_list">
          <caption>앙코르</caption>
          <tbody>
            {
                anchor.artist && anchor.artist.map((a, i) => {
                  return (
                    <tr key={i}>
                      <th>{anchor.artist[i]}</th>
                      <td>{anchor.title[i]}</td>
                    </tr>
                  )
                })
              }
          </tbody>
        </table>
        <div className="close_modal" onClick={closeModal}>
          <p>닫기</p>
        </div>
      </div>
    </>
  );
}

export default Playlist;
