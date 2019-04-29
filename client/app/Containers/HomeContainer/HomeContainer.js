import React, { Component } from 'react';
import 'whatwg-fetch';
import SignUp from "../../components/SignUp/SignUp"
import SignIn from "../../components/SignIn/SignIn"
import './HomeContainer.css'
import Notification from '../../components/Notifications/Notification'
import AccountContainer from '../AccountContainer/AccountContainer'

import {
    getFromStorage,
    setInStorage,
} from '../../utils/storage';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            token: '',
            signUpError: '',
            signInError: '',
            signInEmail: '',
            signInPassword: '',
            signUpEmail: '',
            signUpPassword: '',
            signUpFirstName: '',
            signUpLastName: ''
        };

        this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
        this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
        this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
        this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
        this.onTextboxChangeSignUpFirstName = this.onTextboxChangeSignUpFirstName.bind(this);
        this.onTextboxChangeSignUpLastName = this.onTextboxChangeSignUpLastName.bind(this);

        this.onSignIn = this.onSignIn.bind(this);
        this.onSignUp = this.onSignUp.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        const obj = getFromStorage('the_main_app');
        if (obj && obj.token) {
            const { token } = obj;
            // Verify token
            fetch('/api/account/verify?token=' + token)
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        this.setState({
                            token,
                            isLoading: false
                        });
                    } else {
                        this.setState({
                            isLoading: false,
                        });
                    }
                });
        } else {
            this.setState({
                isLoading: false,
            });
        }
    }

    onTextboxChangeSignInEmail(event) {
        this.setState({
            signInEmail: event.target.value,
        });
    }

    onTextboxChangeSignInPassword(event) {
        this.setState({
            signInPassword: event.target.value,
        });
    }

    onTextboxChangeSignUpEmail(event) {
        this.setState({
            signUpEmail: event.target.value,
        });
    }

    onTextboxChangeSignUpPassword(event) {
        this.setState({
            signUpPassword: event.target.value,
        });
    }
    onTextboxChangeSignUpLastName(event) {
        this.setState({
            signUpLastName: event.target.value,
        });
    }

    onTextboxChangeSignUpFirstName(event) {
        this.setState({
            signUpFirstName: event.target.value,
        });
    }

    onSignUp() {
        const {
            signUpEmail,
            signUpPassword,
            signUpFirstName,
            signUpLastName
        } = this.state;

        this.setState({
            isLoading: true,
        });

        fetch('/api/account/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: signUpEmail,
                password: signUpPassword,
                firstName: signUpFirstName,
                lastName: signUpLastName
            }),
        }).then(res => res.json())
            .then(json => {
                console.log('json', json);
                if (json.success) {
                    this.setState({
                        signUpError: json.message,
                        isLoading: false,
                        signUpEmail: '',
                        signUpPassword: '',
                        signUpFirstName: '',
                        signUpLastName: ''
                    });
                } else {
                    this.setState({
                        signUpError: json.message,
                        isLoading: false,
                    });
                }
            });
    }

    onSignIn() {
        // Grab state
        const {
            signInEmail,
            signInPassword,
        } = this.state;

        this.setState({
            isLoading: true,
        });

        // Post request to backend
        fetch('/api/account/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: signInEmail,
                password: signInPassword,
            }),
        }).then(res => res.json())
            .then(json => {
                console.log('json', json);
                if (json.success) {
                    setInStorage('the_main_app', { token: json.token });
                    this.setState({
                        signInError: json.message,
                        isLoading: false,
                        signInPassword: '',
                        signInEmail: '',
                        token: json.token,
                    });
                } else {
                    this.setState({
                        signInError: json.message,
                        isLoading: false,
                    });
                }
            });
    }

    logout() {
        this.setState({
            isLoading: true,
        });
        const obj = getFromStorage('the_main_app');
        if (obj && obj.token) {
            const { token } = obj;
            // Verify token
            fetch('/api/account/logout?token=' + token)
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        this.setState({
                            token: '',
                            isLoading: false
                        });
                    } else {
                        this.setState({
                            isLoading: false,
                        });
                    }
                });
        } else {
            this.setState({
                isLoading: false,
            });
        }
    }

    render() {
        const {
            isLoading,
            token,
            signInError,
            signUpError,
        } = this.state;

        if (isLoading) {
            return (<div><p>Loading...</p></div>);
        }

        if (!token) {
            return (
                <div>
                    <div style={{
                        'background-image': 'url("https://dt.azadicdn.com/wp-content/uploads/2013/09/digital-book.jpg?200")',
                        'min-height': '100vh',
                        '-webkit-background-size': 'cover',
                        '-moz-background-size': 'cover',
                        '-o-background-size': 'cover',
                        'background-size': 'cover',

                    }}>
                    <div style={{'display':'flex', 'justify-content':'space-evenly'}}>
                    <div>
                        {
                            (signInError) ? (
                                <Notification message={signInError}/>
                               
                            ) : (null)
                        }
                        <SignIn
                            signInEmail={this.signUpEmail}
                            signInPassword={this.signUpPassword}
                            onTextboxChangeSignInEmail={this.onTextboxChangeSignInEmail.bind(this)}
                            onTextboxChangeSignInPassword={this.onTextboxChangeSignInPassword.bind(this)}
                            onSignIn={this.onSignIn.bind(this)}
                        />

                    </div>
                    <div>
                        {
                            (signUpError) ? (
                                <Notification message={signUpError}/>
                            ) : (null)
                        }
                        <SignUp
                            signUpEmail={this.signUpEmail}
                            signUpPassword={this.signUpPassword}
                            signUpFirstName={this.signUpFirstName}
                            signUpLastName={this.signUpLastName}
                            onTextboxChangeSignUpEmail={this.onTextboxChangeSignUpEmail.bind(this)}
                            onTextboxChangeSignUpPassword={this.onTextboxChangeSignUpPassword.bind(this)}
                            onTextboxChangeSignUpFirstName={this.onTextboxChangeSignUpFirstName.bind(this)}
                            onTextboxChangeSignUpLastName={this.onTextboxChangeSignUpLastName.bind(this)}
                            onSignUp={this.onSignUp.bind(this)}
                        />
                    </div>
                    </div>
                    </div>

                </div>
            );
        }

        return (
            <div>
                <AccountContainer/>
                <button onClick={this.logout}>Logout</button>
            </div>
        );
    }
}

export default Home;