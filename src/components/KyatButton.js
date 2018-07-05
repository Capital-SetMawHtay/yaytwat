import React from 'react';
import injectSheet from "react-jss";

const styles = theme => ({
  kyatButton: {
    backgroundColor: theme.colorPrimary,
    color: 'white',
    width: 150,
    height: 70,
    textAlign: 'center',
    fontSize: 16,
    boxShadow: 'none',
  },
});

const KyatButton = ({ classes, children, clickHandler }) => {
  return (
    <button type="button" className={classes.kyatButton} onClick={clickHandler}>
      { children }
    </button>
  );
};

export default injectSheet(styles)(KyatButton);
