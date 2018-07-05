// Import FirebaseAuth and firebase.
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { connect } from "react-redux";
import firebase from '../firebase';
import { authActions } from "../ducks/auth";
import { Redirect } from "react-router-dom";
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
    console.log("Rendering Auth", this.props.isSignedIn);
		if (!this.props.isSignedIn) {
			return (
				<div>
					<StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
