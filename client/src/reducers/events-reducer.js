import { FETCH_EVENTS, ADD_EVENT, DELETE_EVENT } from '../actions/events-actions';

export default function eventsReducer (state = [], action) {
    switch (action.type) {

        case FETCH_EVENTS:
            return state = action.payload.events;

        case ADD_EVENT:
            return [
                ...state,
                action.payload.event
            ];

        case DELETE_EVENT:
            return state.filter((state) => state.id !== action.payload.eventId);

        default:
            return state;
    }
};