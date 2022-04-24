import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { startRegistrer } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './loginregis.css';


export const RegisterScreen = () => {
    const dispatch = useDispatch();
    
    const [ formRegisValues, handleRegisInputChange ] = useForm( {
        rName: '',
        rAvatar: '',
        rEmail: '',
        rPassword1: '',
        rPassword2: ''  
    } );
    
    const { rName, rAvatar, rEmail, rPassword1, rPassword2 } = formRegisValues;

    const handleRegistrer = ( e ) => {
        e.preventDefault();
        if ( rPassword1 !== rPassword2 ) {
            Swal.fire({
                title: 'Error!',
                text: 'Las contraseñas no coinciden',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
        dispatch( startRegistrer( rName, rAvatar, rEmail, rPassword1 ) );
    }  

    return (
        <div className="regis-container">
            <div className="col-md login-form-2 animate__animated animate__fadeInUp">
            <h3>Registro</h3>
            <form onSubmit={ handleRegistrer }>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control animate__animated animate__rotateInDownLeft"
                        placeholder="Nombre"
                        name="rName"
                        value={ rName }
                        onChange={ handleRegisInputChange }
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control animate__animated animate__fadeInTopLeft"
                        placeholder="Avatar"
                        name='rAvatar'
                        value={ rAvatar }
                        onChange={ handleRegisInputChange }
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        className="form-control animate__animated animate__fadeInTopRight"
                        placeholder="Correo"
                        name='rEmail'
                        value={ rEmail }
                        onChange={ handleRegisInputChange }
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        className="form-control animate__animated animate__fadeInBottomLeft"
                        placeholder="Contraseña"
                        name="rPassword1"
                        value={ rPassword1 }
                        onChange={ handleRegisInputChange }
                    />
                </div>

                <div className="form-group">
                    <input
                        type="password"
                        className="form-control animate__animated animate__fadeInBottomRight"
                        placeholder="Repita la contraseña"
                        name="rPassword2"
                        value={ rPassword2 }
                        onChange={ handleRegisInputChange }
                    />
                </div>

                <div className="form-group">
                    <input 
                        type="submit" 
                        className="btnSubmit animate__animated animate__bounceInUp" 
                        value="Crear cuenta" 
                        />
                    <Link 
                        type="submit"
                        className="btnSubmit animate__animated animate__bounceInUp"
                        to="/login" 
                        >   
                    <center>Login</center> 
                    </Link>
                </div>
            </form>
            </div>
        </div>
    )
}