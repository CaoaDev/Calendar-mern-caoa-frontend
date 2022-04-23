import { types } from "../types/types";

// {
//     id: new Date().getTime(),
//     title: 'All Day Event',
//     start: moment().toDate(), //new Date
//     end: moment().add( 2, 'hours' ).toDate(),
//     bgcolor: '#fafafa',
//     notes: 'Comprar Cigarros y chelas',
//     user: {
//       _id: '123',
//       name: 'Juan Perez'
//     }
//   }

const initialState = {
    events: [],
    activeEvent: null,
};

export const calendarReducer = ( state = initialState, action ) => {
    
    switch ( action.type ) {
        
        case types.eventActive:
            return  {
                ...state,
                activeEvent: action.payload
            }
        case types.eventNew:
            return {
                ...state,
                events: [
                    ...state.events,
                    action.payload
                ]
            }      
        case types.eventCleanActiveEvent:
            return {
                ...state,
                activeEvent: null
            }
        case types.eventUpdated:
            return {
                ...state,
                events: state.events.map( event =>
                    ( event.id === action.payload.id ) ? ( event = action.payload ) : event
                )
            }
        case types.eventDeleted:
            return {
                ...state,
                events: state.events.filter( event =>
                    ( event.id !== state.activeEvent.id )
                ),
                activeEvent: null
            }
        case types.eventLoad:
            return {
                ...state,
                events: [ ...action.payload ]
            }
        case types.eventLogout:
            return {
                ...initialState
            }

        default:
            return state;
    }
};