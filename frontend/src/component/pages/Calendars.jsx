import React, { useEffect } from 'react'
import './Calendars.css';
import {useState} from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import Sidebar from '../Sidebar';
import NavBar from '../NavBar';

const Calendars = () => {
  const [date, setDate] = useState(new Date())
  const [saturday,setSaturday] = useState([]);
  const [holiday,setHoliday] = useState([]);
  const id = JSON.parse(localStorage.getItem("EMSuser")).id;

  useEffect(()=>{
    const fetchnotifications=async()=>{
      const data = await fetch(`http://localhost:8000/user/get/user/all/notifi/${id}`);
      const notifications = await data.json();
      notifications[0].notifications.map((notification)=>{
        if(notification.type=='Saturday Status')
        {
          notification.holidayDate && setSaturday(arr=>[notification.holidayDate,...arr])
        }else if(notification.type=='Holiday')
        {
          notification.holidayDate && setHoliday(arr=>[...arr,notification.holidayDate])
        }
      })
    }
    fetchnotifications();
    // console.log(holiday && holiday);
  },[])

  console.log(saturday && saturday);
  console.log(holiday && holiday);
return (
  <>
    <Sidebar/>
    <NavBar/>
    <div className='calendarBg'>
      <div className="calendar">
        <h1 className="Calheader">
        <img src="https://img.icons8.com/color/48/null/overtime.png"/>
          SCHEDULE </h1>
        <div className="calendar-container">
          <Calendar onChange={setDate} value={date}
              tileClassName={({ date, view }) => {
                if(holiday && holiday.find(x=>x===moment(date).format("DD-MM-YYYY"))){
                return  'highlightbtn1'
                }else {
                    if(saturday && saturday.find(x=>x===moment(date).format("DD-MM-YYYY"))){
                        return 'highlightbtn2'
                    }
                }
            }}
          />
        </div>
        <div className="text-center">
            Selected date: {date.toDateString()}
        </div>
      </div>
    </div>
    <div className='one'>dnfkjh</div>
  </>
  )
}

export default Calendars