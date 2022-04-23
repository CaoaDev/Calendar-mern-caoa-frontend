import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import { types } from "../types/types";
import Swal from "sweetalert2";
import { eventLogout } from "./events";

export const startLogin = ( email, password ) => {
    return async( dispatch ) => {

        const resp = await fetchSinToken( 'auth', { email, password }, 'POST' );
        const body = await resp.json();
        
        if ( body.ok ) {
            localStorage.setItem( 'token', body.token );
            localStorage.setItem( 'tokeninitial', new Date().getTime() );
            
            dispatch( login({
                uid: body.uid,
                name: body.name,
                avatar: body.avatar,
                email: body.email
            }))
        } else {
            Swal.fire({
                title: 'Error!',
                text: body.errors.resp ? body.errors.resp.msg : body.errors.email ? body.errors.email.msg : body.errors.password.msg,
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
    }
}

export const startRegistrer = ( name, avatar, email, password ) => {
    return async( dispatch ) => {

        const resp = await fetchSinToken( 'auth/regis', { name, avatar, email, password }, 'POST' );
        const body = await resp.json();

        if ( body.ok ) {
            localStorage.setItem( 'token', body.token );
            localStorage.setItem( 'tokeninitial', new Date().getTime() );

            dispatch( login({
                uid: body.uid,
                name: body.name,
                avatar: body.avatar,
                email: body.email
            }))
        } else {
            Swal.fire({
                title: 'Error!',
                text: body.msg ? body.msg : body.errors.resp ? body.errors.resp.msg : body.errors.email ? body.errors.email.msg : body.errors.password ? body.errors.password.msg : body.errors.name ? body.errors.name.msg : body.errors.avatar ? body.errors.avatar.msg : '',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
    }
}

export const startCheking = () => {
    return async( dispatch ) => {
        const resp = await fetchConToken( 'auth/renew' );
        const body = await resp.json();

        if ( body.ok ) {
            localStorage.setItem( 'token', body.token );
            localStorage.setItem( 'tokeninitial', new Date().getTime() );

            dispatch( login({
                uid: body.uid,
                name: body.name,
                avatar: body.avatar,
                email: body.email
            }))

        } else {

            dispatch( chekingFinish() );
            
        }
    }
}
      
const chekingFinish = () => ({ type: types.authCheckFinish });

const login = ( user ) => ({
type: types.authLogin,
payload: user
});

export const startLogout = () => {
    return async( dispatch ) => {

        localStorage.clear();
        dispatch( eventLogout() );
        dispatch( logout() );

    }
}

const logout = () => ({ type: types.authLogout });