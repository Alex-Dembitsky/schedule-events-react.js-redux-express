import moment from 'moment';

export const dayTimeScale = (time) => {
    let hours = +moment(time).format('HH');
    let minutes = +moment(time).format('mm');
    let startDay = 8.00 * 60; // start day in minutes

    return hours * 60 + minutes - startDay
};