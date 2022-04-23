import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";

export const eventStartAdd = ( event ) => {
    return async( dispatch, getItem ) => {
        const { uid, name, email, avatar } = getItem().auth;

        try {
            const resp = await fetchConToken ( 'events', event, 'POST' );
            const body = await resp.json();

            if  ( body.ok ) {
                event.id = body.evento.id;
                event.user = {
                    _id: uid,
                    name: name,
                    email: email,
                    avatar: avatar
                }
                dispatch( eventNew( event ) );
            }
            Swal.fire( 'Ok', body.msg, 'success' );
        }
        catch ( error ) {
            console.log( error );
        }

    }
}

const eventNew = ( event ) => ( {
    type: types.eventNew,
    payload: event
} );

export const eventActive = ( event ) => ( {
    type: types.eventActive,
    payload: event
} );

export const eventCleanActiveEvent = () => ( { type: types.eventCleanActiveEvent } );

export const eventStartUpdate = ( event ) => {
    return async( dispatch ) => {

        try {
            console.log( event );
            const resp = await fetchConToken ( `events/${event.id}`, event, 'PUT' );
            const body = await resp.json();

            if  ( body.ok ) {
                dispatch( eventUpdated( event ) );
            } else {
                Swal.fire( 'Error', body.msg, 'error' );
            }
        } catch (error) {

            console.log(error);

        }
    }
}

const eventUpdated = ( event ) => ( {
    type: types.eventUpdated,
    payload: event
} );

export const eventStartDelete = () => {
    return async( dispatch, getItem ) => {
        const { id } = getItem().calendar.activeEvent;

        try {
            const resp = await fetchConToken ( `events/${id}`, {}, 'Delete' );
            const body = await resp.json();

            if  ( body.ok ) {
                dispatch( eventDeleted() );
            } else {
                Swal.fire( 'Error', body.msg, 'error' );
            }
            Swal.fire( 'Ok', body.msg, 'success' );
        } catch (error) {

            console.log(error);

        }
    }
}  

const eventDeleted = () => ( { type: types.eventDeleted } );

export const eventStarLoad = () => {
    return async( dispatch ) => {
        try {
            const resp = await fetchConToken ( 'events' );
            const body = await resp.json();
            const events = prepareEvents ( body.events );

            dispatch( eventLoad( events ) );

        } catch ( error ) {
            console.log( error );

        }
    }
}

export const eventLoad = ( events ) => ( {
    type: types.eventLoad,
    payload: events
} );

export const eventLogout = () => ( { type: types.eventLogout } );