// Import FirebaseAuth and firebase.
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import { connect } from 'react-redux';
import {} from './index'
// Configure Firebase.
const config = {
	apiKey: 'AIzaSyAeue-AsYu76MMQlTOM-KlbYBlusW9c1FM',
	authDomain: 'myproject-1234.firebaseapp.com'
	// ...
};
firebase.initializeApp(config);

class SignInScreen extends React.Component {
	// Configure FirebaseUI.
	uiConfig = {
		// Popup signin flow rather than redirect flow.
		signInFlow: 'popup',
		// We will display Google and Facebook as auth providers.
		signInOptions: [ firebase.auth.GoogleAuthProvider.PROVIDER_ID, firebase.auth.FacebookAuthProvider.PROVIDER_ID ],
		callbacks: {
			// Avoid redirects after sign-in.
			signInSuccessWithAuthResult: () => false
		}
	};

	// Listen to the Firebase Auth state and set the local state.
	componentDidMount() {
		this.unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) =>
			this.props.signInSuccess(user);
		);
	}

	// Make sure we un-register Firebase observers when the component unmounts.
	componentWillUnmount() {
		this.unregisterAuthObserver();
	}

	render() {
		const { user } = this.props;
	
		if (!user) {
			return (
				<div>
					<h1> My App </h1>
					<p> Please sign - in: </p>
					{' '}
					<StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />{' '}
				</div>
			);
		}
		return (
			<div>
				<h1> My App </h1>
				<p>
					{' '}
					Welcome {firebase.auth().currentUser.displayName}!You are now signed - in !{' '}
				</p>{' '}
				<a onClick={() => firebase.auth().signOut()}> Sign - out </a>{' '}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
	signInSuccess: (user) => dispatch(authActions.signInSuccess(user)),
});

export default connect(mapStateToProps, mapDispatchToProps);
