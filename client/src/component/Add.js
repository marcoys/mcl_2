import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import AddInput from './AddInput';


function Add() {
  const [ date, setDate ] = useState(new Date());
  const [ time, setTime ] = useState(new Date());
  const [ imgFile, setImgFile ] = useState('');
  const [ imgUrl, setImgUrl ] = useState('');
  const [ addOpt, setAddOpt ] = useState(['prgtitle', 'anctitle']);

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

  function handleBtnNext () {
    document.querySelector('.btn-next').style.display = 'none'
    document.querySelector('.add-info').setAttribute('style', 'visibility: hidden; position: absolute;');
    document.querySelector('.add-program').setAttribute('style', 'left: 50%; opacity: 1;')
  }

  function handleBtnPrev () {
    document.querySelector('.btn-next').style.display = 'block'
    document.querySelector('.add-info').setAttribute('style', 'visibility: visible; position: relative;')
    document.querySelector('.add-program').setAttribute('style', 'opacity: 0; visibility: hidden;')
  }



  let poster_preview = <img className='poster_preview' src='/images/noimage.gif'></img>;
  if(imgFile !== '') {
    poster_preview = <img className='poster_preview' src={imgUrl}></img>
  } 

  return (
    <div className='container add-wrap'>
      <form action="/addshow" method='POST' encType="multipart/form-data" >
        
        <div className='add-box add-info'>
          <h1>공연 추가</h1>
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

          <div className='btn-next' onClick={handleBtnNext}>다음 <FontAwesomeIcon icon={faArrowRight} /></div>
        </div>

        <div className='add-box add-program'>
            <h1>프로그램 추가</h1>
            <h5>- 프로그램</h5>
            <ul>
              <AddInput addOpt={addOpt[0]}/>
            </ul>
            <h5>- 앙코르</h5>
            <ul>
              <AddInput addOpt={addOpt[1]}/>
            </ul>

            <div className='btn-next' onClick={handleBtnPrev}>이전 <FontAwesomeIcon icon={faArrowLeft} /></div>

            <button type='submit' className='btn-submit'>등록</button>
          </div>
      </form>
    </div>
  )
}

export default Add