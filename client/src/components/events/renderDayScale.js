import React from 'react';
import moment from 'moment/moment';

export const renderDayScale = (start, end) => {
    let separators = [];

    for (let i = start; i <= end; i += 30) {
        let hours = i / 60;
        let minutes = i % 60;

        separators.push(
            (
                <div key={i} className="calendar_slot">
                    <div key={i}
                         className="calendar_time_separators">{moment.utc().hours(hours).minutes(minutes).format('hh:mm')}</div>
                </div>
            )
        )
    }
    return separators;
};