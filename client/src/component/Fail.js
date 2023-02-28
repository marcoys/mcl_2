import React, { useEffect } from 'react';
import { redirect } from 'react-router-dom';

function Fail() {
  useEffect(() => {
    alert('로그인 실패');
    window.location.replace('/')
  
    return () => {
    }
  }, [])

  return (
    <div>

    </div>
  )
}

export default Fail