// Import FirebaseAuth and firebase.
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { connect } from "react-redux";
import firebase from '../firebase';
import { authActions } from "../ducks/auth";
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
			this.props.signInSuccess(user);
		});
	}

	// Make sure we un-register Firebase observers when the component unmounts.
	componentWillUnmount() {
		this.unregisterAuthObserver();
	}

	render() {
		if (!this.props.isSignedIn) {
			return (
				<div>
					<h1> My App </h1> <p> Please sign - in: </p>{' '}
					<StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />{' '}
				</div>
			);
		}
		return (
			<div>
				<h1> My App </h1> <p>
					{' '}
					Welcome {firebase.auth().currentUser.displayName}!You are now signed - in !{' '}
				</p>{' '}
				<a onClick={() => firebase.auth().signOut()}> Sign - out </a>{' '}
			</div>
		);
	}
}

const mapDispatchToProps = (disptach) => ({
  signInSuccess: (user) => disptach(authActions.signInSuccess(user)),
});

const mapStateToProps = (store) => ({
  isSignedIn: !!(store.user),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
