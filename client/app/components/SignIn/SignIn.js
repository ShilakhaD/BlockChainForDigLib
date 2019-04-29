import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import classNames from 'classnames';
import DialogTitle from '@material-ui/core/DialogTitle';
// import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';


const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
  });

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        open:false
    };

    this.handleClickOpen = this.handleClickOpen.bind(this)
}
  

  handleClickOpen() {
    this.setState({ open: true });
  };

  handleClose() {
    this.setState({ open: false });
    console.log("closed")
    // this.props.history.push('/home');
    this.props.onSignIn()
  };
  render() {
    const props = this.props
    return (
      <div>
        <Button style={{"margin-top":'200px', 'transform':'scale(2)'}} variant="contained" color="primary" onClick={this.handleClickOpen}>
          SignIn
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Sign In</DialogTitle>
          <DialogContent>
          
            <TextField
              id="outlined-bare"
              type="email"
              placeholder="Email"
              variant="outlined"
              value={props.signInEmail}
              onChange={props.onTextboxChangeSignInEmail}
            />
            <TextField
              id="outlined-bare"
              type="password"
              variant="outlined"
              placeholder="Password"
              value={props.signInPassword}
              onChange={props.onTextboxChangeSignInPassword}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={(e) => this.handleClose()} color="primary">
              SignIn
            </Button>
          </DialogActions>
        </Dialog>
        
      </div>
    );
  }
}