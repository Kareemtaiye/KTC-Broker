import React from 'react'
import "./Ticket.css"

const Ticket = () => {
  return (
    <div className='Ticket-main-container'> 
      <div className='Ticket-first-line'>
        <label>Name</label>
        <input type="text"  placeholder='Ujah Collins'/>
      </div>
      <div className='Ticket-first-line'>
        <label>Email Adress</label>
        <input type="text"  placeholder='UjahCollins@gmail.com'/>
      </div>
      <div className='Ticket-first-line-style2'>
        <label>Subject</label>
        <input type="text"  placeholder=''/>
      </div>
      <div className='Ticket-first-line-style2'>
        <label>Priority</label>
        <select name="priority" id="">
              <option value="High">High</option>
              <option value="High">Medium</option>
              <option value="High">Low</option>
        </select>
      </div>
    </div>
  )
}

export default Ticket
