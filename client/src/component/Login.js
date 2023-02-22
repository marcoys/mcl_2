import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

function Login({ mdLogin, setMdLogin}) {
  const [ mdon, setMdon ] = useState('');
  const closeModal = () => {
    setMdLogin('false');
  }

  useEffect(() => {
    if(mdLogin) {
      setTimeout(() => {
        setMdon('mdon')
      }, 100)
    }
  
    return () => {
    }
  }, [mdLogin])

  return (
    <>
      <div className={mdLogin ? `black-bg ${mdon}` : 'black-bg'} ></div>
      <div className="modal_login">
        <span onClick={closeModal}>x</span>
        <h5>LOG IN</h5>
        <form>
          <table>
            <tbody>
              <tr>
                <th>
                  <p>아이디</p>
                </th>
                <td>
                  <input type="text" />
                </td>
              </tr>
              <tr>
                <th>
                  <p>비밀번호</p>
                </th>
                <td>
                  <input type="password" />
                </td>
              </tr>
            </tbody>
          </table>

          <button className="btn_login" type="submit">
            <p>로그인</p>
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
