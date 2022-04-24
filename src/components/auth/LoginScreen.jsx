import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogin } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';


export const LoginScreen = () => {
    const dispatch = useDispatch();

    const [ formLoginValues, handleLoginInputChange ] = useForm( {
        lEmail: '',
        lPassword: ''
    } );

    const { lEmail, lPassword } = formLoginValues;

    const handleLogin = ( e ) => {
        e.preventDefault();
        dispatch( startLogin( lEmail, lPassword ) );
    }

    return (
        <div className="login-container">
            <div className="row m-0">
                <div className="col-md login-form-1 animate__animated animate__pulse">
                    <h2>Ingresar</h2>
                    <form onSubmit={ handleLogin }>
                        <div className="form-group animate__animated animate__backInLeft">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="lEmail"
                                value={ lEmail }
                                onChange={ handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group animate__animated animate__backInRight">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="lPassword"
                                value={ lPassword }
                                onChange={ handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit animate__animated animate__fadeInBottomLeft"
                                value="Login" 
                            />
                            <Link 
                                type="submit"
                                className="btnSubmit animate__animated animate__fadeInBottomRight"
                                to="/regis" 
                            >   
                               <center>Registrarse</center> 
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}