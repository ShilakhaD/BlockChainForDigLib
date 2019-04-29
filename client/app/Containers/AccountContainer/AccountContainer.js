import React, { Component } from 'react';
import 'whatwg-fetch';
import { withRouter } from 'react-router-dom';
import { browserHistory } from 'react-router';
import Button from '@material-ui/core/Button';
import SignUp from "../../components/SignUp/SignUp"
import SignIn from "../../components/SignIn/SignIn"
import './AccountContainer.css'
import Notification from '../../components/Notifications/Notification'

import {
    getFromStorage,
    setInStorage,
} from '../../utils/storage';


class AccountContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
           
        };

       this.handleRequestPublish = this.handleRequestPublish.bind(this)
    }

    handleRequestPublish(){
        this.props.history.push('/requestPublish')
    }

    render() {
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
                    
                    <Button style={{"margin-top":'200px', 'transform':'scale(2)'}} variant="contained" color="primary" onClick={this.handleRequestPublish}>Request a publish</Button>
                    <Button style={{"margin-top":'200px', 'transform':'scale(2)'}} variant="contained" color="primary" onClick={this.handleGetAsset}>Get An asset from Chain</Button>
                    </div>
                    </div>

                </div>
            );
        }

       
    }


export default withRouter(AccountContainer);