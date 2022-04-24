import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth'

export const Navbar = () => {
  const dispatch = useDispatch()
  const { avatar } = useSelector(state => state.auth)
  const handleLogout = () => {
    dispatch( startLogout() );
  } 

  return (
    <div className='navbar navbar-dark bg-dark mb-4 animate__animated animate__fadeInDown'>
        <span className='navbar-brand'>
          { avatar }
        </span>
        <button 
          className='btn btn-outline-danger animate__animated animate__backInRight'
          onClick={ handleLogout }
        >
          <i className='fas fa-sign-out-alt'></i>
          <span>Salir</span>
        </button>
    </div>
  )
}
