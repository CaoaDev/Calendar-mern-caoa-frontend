import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2';
import { uiCloseModal } from '../../actions/ui';
import { eventCleanActiveEvent, eventStartAdd, eventStartUpdate } from '../../actions/events';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

 Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add( 1, 'hours' );
const now1hrs = now.clone().add( 1, 'hours' );
const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: now1hrs.toDate(),
}

export const CalendarModal = () => {
    const { modalOpen } = useSelector ( state => state.ui );
    const { activeEvent } = useSelector ( state => state.calendar );
    const dispatch = useDispatch();

    const [ dateStart, setDateStart ] = useState( now.toDate() );
    const [ dateEnd, setDateEnd ] = useState( now1hrs.toDate() );
    const [titleValid, setTitleValid] = useState( true );
    const [formvalues, setFormvalues] = useState( initEvent );

    const { notes, title, start, end } = formvalues;

    useEffect(() => {
        if( activeEvent ){
            setFormvalues( activeEvent );
        } else {
            setFormvalues( initEvent );
        }
    }, [ activeEvent, setFormvalues ] )
    

    const handleChange = ( { target } ) => {
        setFormvalues({
            ...formvalues,
            [target.name]: target.value,
        });
    };
    
    const closeModal = () => {
        dispatch( uiCloseModal() );
        dispatch( eventCleanActiveEvent() );
        setFormvalues( initEvent );
    };
    
    const onChangeDateStart = ( e ) => {
        setDateStart( e );
        setFormvalues({
            ...formvalues,
            start: e,
        });
    };

    const onChangeDateEnd = ( e ) => {
        setDateEnd( e );
        setFormvalues({
            ...formvalues,
            end: e,
        });
    };

    const handleSubmitForm = ( e ) => {
        e.preventDefault();
        const momentStar = moment( start );
        const momentEnd = moment( end );
       
        if ( momentStar.isSameOrAfter( momentEnd ) ) {
            return Swal.fire( 'Error','La fecha de inicio debe ser menor a la fecha de fin', 'error' );
        }
        if ( title.trim().length < 2 || notes.trim().length < 2 ) {
            Swal.fire( 'Error','Revise que su titulo y nota tenga contenido', 'error' );
            return setTitleValid( false );
        }
        
        if ( activeEvent ) {
            dispatch( eventStartUpdate( formvalues ) );
        } else {
            dispatch( eventStartAdd( formvalues ) );
        }
        
        setTitleValid( true );
        closeModal();
    };   
  
    return (
    <Modal
        isOpen={ modalOpen }
        // onAfterOpen={afterOpenModal}
        onRequestClose={ closeModal }
        style={ customStyles }
        closeTimeoutMS={ 200 }
        className='modal'
        overlayClassName='modal-fondo'
    >
        <h1><center> { ( activeEvent ) ? ( title ) : 'Nuevo Evento' } </center></h1>
        
        <hr />

        <form 
            className="container"
            onSubmit={ handleSubmitForm }
        >
            <div className="form-group">
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={ `form-control ${ !titleValid && 'is-invalid' }` }
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={ title }
                        onChange={ handleChange }
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <label>Fecha y hora inicio</label>
                <DateTimePicker 
                    onChange={ onChangeDateStart } 
                    value={ dateStart }
                    className='form-control'
                />
            </div>
            <div className="form-group">
                <label>Fecha y hora final</label>
                <DateTimePicker 
                    onChange={ onChangeDateEnd } 
                    value={ dateEnd }
                    minDate={ dateStart }
                    className='form-control'
                />
            </div>

            <hr />

            <div className="form-group">
                <textarea 
                    type="text" 
                    className="form-control"
                    placeholder="Notas"
                    rows="5"
                    name="notes"
                    value={ notes }
                    onChange={ handleChange }
                />
                <small id="emailHelp" className="form-text text-muted">Información adicional</small>
            </div>

            <button
                type="submit"
                className="btn btn-outline-primary btn-block"
            >
                <i className="far fa-save"></i>
                <span> Guardar</span>
            </button>

        </form>
  </Modal>
  )
};
