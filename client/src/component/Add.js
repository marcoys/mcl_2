import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";


function Add() {
  const [ date, setDate ] = useState(new Date());
  const [ time, setTime ] = useState(new Date());
  const [ imgFile, setImgFile ] = useState('');
  const [ imgUrl, setImgUrl ] = useState('');

  function handleFileOnChange (e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setImgFile(file);
      setImgUrl(reader.result);
    }
    reader.readAsDataURL(file);
  }

  let poster_preview = null;
  if(imgFile !== '') {
    poster_preview = <img className='poster_preview' src={imgUrl}></img>
  }

  return (
    <div className='container add-wrap'>
      <form action="/addshow" method='POST' encType="multipart/form-data" >
        <h1>공연 추가하기</h1>
        <div className='add-box'>
          
          <span className="ip-box">
            <h5>연주자</h5>
            <span className='ip-wrap'>
              <input type="text" name='artist'/>
            </span>
          </span>
          
          <span className="ip-box">
            <h5>공연장</h5> 
            <span className='ip-wrap'>
            <input type="text" name='location'/>
            </span>
          </span>
          
          <span className="ip-box">
            <h5>날짜</h5>
            <span className='ip-wrap'>
              <DatePicker
                showIcon
                selected={date}
                onChange={(date) => setDate(date)}
                locale={ko}     // 한글로 변경
                dateFormat="yyyy.MM.dd (eee)" // 시간 포맷 변경
                name='date'
                showYearDropdown
                dateFormatCalendar="MMMM"
                yearDropdownItemNumber={15}
                scrollableYearDropdown
              />
            </span>
          </span>
          
          <span className="ip-box">
            <h5>시간</h5>
            <span className='ip-wrap'>
            <DatePicker
              selected={time}
              onChange={(date) => setTime(date)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeCaption="Time"
              dateFormat="h:mm aa"
              name='time'
            />
            </span>
          </span>
          
          <span className="ip-box">
            <h5>좌석</h5>
            <span className='ip-wrap'>
              <input type="text" name='seat'/>
            </span>
          </span>

          <span className="ip-box">
            <h5>가격</h5>
            <span className='ip-wrap'>
              <input type="text" name='price'/>
            </span>
          </span>

          <span className="ip-box">
            <h5>포스터</h5>
            <input type="file" name='poster' onChange={handleFileOnChange}/>
            {poster_preview}
          </span>

          <button type='submit' className='btn-submit'>다음</button>

          <p>다음으로 넘기면 리스트 추가 페이지</p>
        </div>
      </form>
    </div>
  )
}

export default Add