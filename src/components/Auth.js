// Import FirebaseAuth and firebase.
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { connect } from "react-redux";
import firebase from '../firebase';
import { authActions } from "../ducks/auth";
import { Redirect } from "react-router-dom";
import injectSheet, { ThemeProvider } from 'react-jss';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    margin: '0px auto',
    boxSizing: 'border-box',
    width: 375,
    height: '100vh',
    "& .row": {
      width: 375,
      display: 'flex',
      justifyContent: 'center',
      "& .logo": {
        margin: '0px auto',
        width: 220,
      },
    },
  },
  button: {
    background: 'white',
  },
  label: {
    fontWeight: 'bold',
  }
})
class Auth extends React.Component {
	// Configure FirebaseUI.
	uiConfig = {
		// Popup signin flow rather than redirect flow.
		signInFlow: 'popup',
		// We will display Google and Facebook as auth providers.
		signInOptions: [ firebase.auth.GoogleAuthProvider.PROVIDER_ID ],
		callbacks: {
			// Avoid redirects after sign-in.
			signInSuccessWithAuthResult: () => false
		}
	};

	// Listen to the Firebase Auth state and set the local state.
	componentDidMount() {
		this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(user =>{
      console.log("Auth state changed!");
      if(user) {
        this.props.signInSuccess(user);
      }
		});
	}

	// Make sure we un-register Firebase observers when the component unmounts.
	componentWillUnmount() {
		this.unregisterAuthObserver();
	}

	render() {
    const { classes } = this.props;
    console.log("Rendering Auth", this.props.isSignedIn);
		if (!this.props.isSignedIn) {
			return (
				<div className={classes.container}>
          <div className="row">
            <img src="yaytwat-logo.png" className="logo" title="yaytwat logo" />
          </div>
          <div className="row">
					  <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
          </div>
				</div>
			);
    }
    return <Redirect to="/home" />;
	}
}

const mapDispatchToProps = (dispatch) => ({
  signInSuccess: (user) => dispatch(authActions.signInSuccess(user)),
});

const mapStateToProps = (store) => ({
  isSignedIn: !!(store.user),
});

export default injectSheet(styles)(connect(mapStateToProps, mapDispatchToProps)(Auth));
