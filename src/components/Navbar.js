import React from 'react';
import injectSheet from 'react-jss';
import { connect } from "react-redux";
import Color from 'color';
import firebase from '../firebase';
import { authActions } from "../ducks/auth";
import ExitIcon from 'react-icons/lib/md/exit-to-app';

const styles = theme => ({
  navContainer: {
    width: '100vw',
    boxSizing: 'border-box',
    height: 50,
    fontFamily: 'Robot Slab',
    fontSize: 18,
    backgroundColor: Color(theme.colorPrimary).darken(0.2).string(),
    color: 'white',
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const Navbar = class extends React.Component {
  constructor(props) {
    super(props);
  }

  signOut = () => {
    firebase.auth().signOut().then(() => {
      this.props.signOut();
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.navContainer}>
        <ExitIcon size={30} onClick={this.signOut} />
      </div>
    )
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(authActions.signOut()),
  };
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
}

export default injectSheet(styles)(connect(mapStateToProps, mapDispatchToProps)(Navbar));
