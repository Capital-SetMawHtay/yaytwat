import React from 'react';
import { connect } from "react-redux";
import { homeActions } from "../ducks/home";
import injectSheet from 'react-jss';
import Navbar from './Navbar'

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    margin: '0px auto',
    boxSizing: 'border-box',
    width: '100vw',
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
class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.props.requestData(this.props.user);
  }

  render() {
    const { user, data, classes } = this.props;

    return (
      <div className={classes.container}>
        <Navbar />
        <div>
          <h1> My App </h1>
          <p>
            Welcome {user.displayName}!You are now signed - in !{' '}
          </p>
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

export default injectSheet(styles)(connect(mapStateToProps, mapDispatchToProps)(Home));
