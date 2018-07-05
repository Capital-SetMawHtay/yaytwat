import React from 'react';
import { connect } from "react-redux";
import firebase from '../firebase';
import { homeActions } from "../ducks/home";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.props.requestData(this.props.user);
  }
  

  render() {
    const { user, data } = this.props;

    return (
      <div>
        <h3>
          Hello from home
        </h3>
        <div>
          <h1> My App </h1>
          <p>
            Welcome {user.displayName}!You are now signed - in !{' '}
          </p>
          <button type="submit" onClick={() => firebase.auth().signOut()}>
            Sign - out
          </button>
          {
            JSON.stringify(data)
          }
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    requestData: (user) => dispatch(homeActions.userDataRequested(user)), 
  };
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    data: state.home,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
