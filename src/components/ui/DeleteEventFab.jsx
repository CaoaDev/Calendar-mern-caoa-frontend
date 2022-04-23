import React from 'react';
import { useDispatch } from 'react-redux';
import { eventStartDelete } from '../../actions/events';

export const DeleteEventFab = () => {
    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch( eventStartDelete() );
    }
  return (
    <button
        className="btn btn-danger fab-danger animate__animated animate__fadeInUp"
        onClick={ handleDelete }
    >
        <i className='fas fa-trash'></i>
        <span> Borrar Evento</span>
    </button>
  )
}
