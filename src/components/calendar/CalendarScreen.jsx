import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

import { Navbar } from '../ui/Navbar'
import { AddNewFab } from '../ui/AddNewFab'
import { DeleteEventFab } from '../ui/DeleteEventFab'
import { messages } from '../../helpers/calendar-messages-es'
import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'

import { uiOpenModal } from '../../actions/ui'
import { eventActive, eventCleanActiveEvent, eventStarLoad } from '../../actions/events'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'moment/locale/es'

moment.locale('es');

const localizer = momentLocalizer(moment); // or globalizeLocalizer

export const CalendarScreen = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector ( state => state.calendar );
  // const { uid } = useSelector ( state => state.auth ); // uid = user id la pagina ve los eventos de los demas
  const [ lasView, setLasView] = useState( localStorage.getItem( 'lastView' ) || 'month' );

  
  useEffect(() => {
    dispatch( eventStarLoad() );
  }, [ dispatch ])
  
  
  const onDoubleClick = ( e ) => {
    dispatch( uiOpenModal() );
  }
  const onClick = ( e ) => {
    dispatch( eventActive( e ) );
  }
  const onViewChange = ( e ) => {
    setLasView( e );
    localStorage.setItem( 'lastView', e );
  }
  const onSelectSlot = ( e ) => {
    dispatch( eventCleanActiveEvent() );
  }
  const enventStyleGetter = ( event, start, end, isSelector ) => {
    const style = {
      // backgroundColor: ( uid === event.user._id ) ? '#367cf7' : '#e6e6e6', en caso de que se muentre los eventos de los demas usuarios
      backgroundColor: '#367cf7',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white',
    }
    return {
      style
    }
  }
  
  return (
    <div className='calendar-screen animate__animated animate__fadeIn'>
      < Navbar />
      <Calendar
        localizer={ localizer }
        events={ events }
        startAccessor="start"
        endAccessor="end"
        messages={ messages }
        eventPropGetter={ enventStyleGetter }
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onClick }
        onView={ onViewChange }
        onSelectSlot={ onSelectSlot }
        selectable={ true }
        view={ lasView }
        components={{ 
          event: CalendarEvent
        }}
      />
      < AddNewFab />

      {
        ( activeEvent ) && < DeleteEventFab />
      }
      < CalendarModal />
    </div>
  )
};
