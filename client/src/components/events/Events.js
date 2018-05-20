import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchEvents, addEvent, deleteEvent} from '../../actions/events-actions';
import {logOut} from '../../actions/logout-action';
import {dayTimeScale} from './dayTimeScale';
import {renderDayScale} from './renderDayScale';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import './Events.css';

import Header from '../header/Header';

class Events extends Component {
    constructor(props) {
        super (props);

        this.addEvent = this.addEvent.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    componentDidMount() {
        this.props.onFetchEvents();
    }

    addEvent(e) {
        e.preventDefault();

        let startTime = this.eventStartTimeInput;
        let endTime = this.eventEndTimeInput;
        let title = this.eventTitleInput.value;
        let duration;

        if (startTime === undefined || endTime === undefined || title.length <= 0) {
            alert('Fields can\'t be empty');

        } else if (+moment(startTime).format('HH.mm') >= +moment(endTime).format('HH.mm')) {
            alert('End time can\'t be less than start time');

        } else {
            startTime = dayTimeScale(startTime);
            endTime = dayTimeScale(endTime);
            duration = endTime - startTime;

            this.props.onAddEvent({"title": title, "start": startTime, "duration": duration});

            window.scrollTo(0, 400);
        }
    }

    deleteEvent(event) {
        if (window.confirm('Do you want delete this event?')) {
            return this.props.onDeleteEvent(event);
        } else {
            return false
        }
    }

    logOut() {
        this.props.onLogOut();
        this.props.history.push('/login');
    }

    render() {
        return (
            <div className="App">
                <Header/>
                <button className="btn btn-sm btn-primary log-out" onClick={this.logOut}>Log out</button>

                <form>
                    <h4>Create new event</h4>
                    <div className="form-group row">
                        <label htmlFor="startTime" className="col-sm-4 col-form-label col-form-label-sm">Start time:</label>
                        <div className="col-sm-8">
                            <TimePicker
                                className="form-control form-control-sm"
                                id="startTime"
                                use12Hours={true}
                                showSecond={false}
                                disabledHours={() => [1, 2, 3, 4, 5, 6, 7, 17, 18, 19, 20, 21, 22, 23, 24]}
                                onChange={(input) => this.eventStartTimeInput = input}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="endTime" className="col-sm-4 col-form-label col-form-label-sm">End time:</label>
                        <div className="col-sm-8">
                            <TimePicker
                                className="form-control form-control-sm"
                                id="endTime"
                                use12Hours={true}
                                showSecond={false}
                                disabledHours={() => [1, 2, 3, 4, 5, 6, 7, 17, 18, 19, 20, 21, 22, 23, 24]}
                                onChange={(input) => this.eventEndTimeInput = input}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="title" className="col-sm-4 col-form-label col-form-label-sm">Title:</label>
                        <div className="col-sm-8">
                            <input id="title" className="form-control form-control-sm" type="text" ref={(input) => this.eventTitleInput = input} required />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-12">
                            <button className="btn btn-sm btn-primary" onClick={this.addEvent}>add event</button>
                        </div>
                    </div>
                    <div className="note">To delete an event, click on it</div>
                </form>

                <div id="calendar" className="calendar">
                    <div className="calendar_left_slot">
                        {renderDayScale(480, 750)}
                    </div>
                    <div className="calendar_right_slot">
                        {renderDayScale(780, 1050)}
                    </div>
                    <div className="calendar_events_container">
                        {this.props.events.map((event, index) => {
                                return (
                                    <div key={index}
                                         className="calendar_event"
                                         onClick={this.deleteEvent.bind(this, event)}
                                         style={{
                                            top: event.start * 2 >= 600 ? event.start * 2 - 600 : event.start * 2,
                                            height: event.duration * 2,
                                            left: event.start * 2 <= 540 ? 50 : 350
                                        }}>
                                        <span className="calendar_event_title"><b>Event title:</b> {event.title}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="export_events">
                    <h4>Export calendar data</h4>
                    <code className="export_events_container">{JSON.stringify(this.props.events)}</code>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    events: state.events,
    isLoggedIn: state.isLoggedIn
});

const mapActionsToProps = {
    onFetchEvents: fetchEvents,
    onAddEvent: addEvent,
    onDeleteEvent: deleteEvent,
    onLogOut: logOut
};

export default connect(mapStateToProps, mapActionsToProps)(Events);
