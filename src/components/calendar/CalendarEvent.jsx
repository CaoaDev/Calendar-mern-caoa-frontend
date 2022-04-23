import React from 'react'

export const CalendarEvent = ( { event } ) => {
    const { title, user } = event;
  return (
    <div className='evento animate__animated animate__zoomIn'>
        <strong>{ title }</strong>
        <span>- { user.name }</span>
    </div>
  )
}
