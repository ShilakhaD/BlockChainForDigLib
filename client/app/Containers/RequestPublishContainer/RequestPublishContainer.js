import React, { Component } from 'react';
import 'whatwg-fetch';
import Button from '@material-ui/core/Button';
import SignUp from "../../components/SignUp/SignUp"
import SignIn from "../../components/SignIn/SignIn"
import './RequestPublishContainer.css'

import {
    getFromStorage,
    setInStorage,
} from '../../utils/storage';

class RequestPublishContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        };

       
    }

    render() {
        console.log("came here")
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
                    
                    <Button style={{"margin-top":'200px', 'transform':'scale(2)'}} variant="contained" color="primary" onClick={this.handleClickOpen}>Upload</Button>
                    </div>
                    </div>

                </div>
            );
        }

       
    }


export default RequestPublishContainer;