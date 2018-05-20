import axios from "axios";
export const FETCH_EVENTS = 'events:fetchEvents';
export const ADD_EVENT = 'events:addEvent';
export const DELETE_EVENT = 'events:deleteEvent';

const token = window.localStorage.getItem('Token');

export function fetchEvents() {
    return dispatch => {
        axios.get('/events', { headers: {'authorization':`bearer ${token}`}})
            .then(response => {
                dispatch({type: FETCH_EVENTS, payload: {events: response.data}})
            })
            .catch(error => {
                alert(error);
            });
    }
}

export function addEvent(event) {
    return dispatch => {
        axios.put('/events', event, { headers: {'authorization':`bearer ${token}`}})
            .then(response => {
                dispatch({type: ADD_EVENT, payload: {event: response.data}})
            })
            .catch(error => {
                alert(error);
            });
    }
}

export function deleteEvent(event) {
    return dispatch => {
        axios.delete(`/events/:${event.id}`, { headers: {'authorization':`bearer ${token}`}})
            .then(response => {
                dispatch({type: DELETE_EVENT, payload: {eventId: response.data}})
            })
            .catch(error => {
                alert(error);
            });
    }
}