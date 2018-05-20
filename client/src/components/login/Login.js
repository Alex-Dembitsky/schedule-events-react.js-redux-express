import React, {Component} from 'react';
import {connect} from 'react-redux';
import {logIn} from '../../actions/login-action';
import Header from '../header/Header';
import './Login.css';

class Login extends Component {
    constructor(props) {
        super(props);

        this.onLogin = this.onLogin.bind(this);
    }

    onLogin(event) {
        event.preventDefault();

        let email = this.emailInput.value;
        let password = this.passwordInput.value;

        if (email.length <= 0 || password.length <= 0) {
            alert('Fields can\'t be empty');
        } else {
            this.props.onLogin(email, password);
        }
    }

    render() {
        return (
            <div className="Login">
                <Header />
                <div className="container">
                    <form className="form-login">
                        <h4 className="form-login-heading">Please log in</h4>
                        <label htmlFor="inputEmail" className="sr-only">Email address</label>
                        <input ref={(input) => this.emailInput = input} type="email" id="inputEmail" className="form-control" placeholder="Email address" required="" autoFocus="" />
                        <label htmlFor="inputPassword" className="sr-only">Password</label>
                        <input ref={(input) => this.passwordInput = input} type="password" id="inputPassword" className="form-control" placeholder="Password" required="" />
                        <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.onLogin}>Log in</button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapActionsToProps = {
    onLogin: logIn
};

export default connect(null, mapActionsToProps)(Login);