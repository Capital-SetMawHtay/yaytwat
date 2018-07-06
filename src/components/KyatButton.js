import React from 'react';
import injectSheet from "react-jss";
import Tappable from 'react-tappable';
import Swipeable from 'react-swipeable';

const styles = theme => ({
  kyatButton: {
    backgroundColor: theme.colorPrimary,
    color: 'white',
    width: 150,
    height: 40,
    textAlign: 'center',
    fontSize: 16,
    boxShadow: 'none',
  },
});

const KyatButton = ({ classes, children, increase, decrease }) => {
  return (
    <Swipeable
      onSwipedRight={increase}
      onSwipedLeft={decrease}
      className={classes.kyatButton}
    >
      {children}
    </Swipeable>
  );
};

export default injectSheet(styles)(KyatButton);
