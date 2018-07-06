import React from 'react';
import injectSheet from "react-jss";
import Swipeable from 'react-swipeable';
import UpIcon from 'react-icons/lib/md/thumb-up';
import DownIcon from 'react-icons/lib/md/thumb-down';

const styles = theme => ({
  kyatButton: {
    backgroundColor: theme.colorPrimary,
    color: 'white',
    width: '100vw',
    height: 80,
    textAlign: 'center',
    fontSize: 16,
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

const KyatButton = ({ classes, countRecord, increase, decrease }) => {
  return (
    <Swipeable
      onSwipedRight={increase}
      onSwipedLeft={decrease}
      className={classes.kyatButton}
    >
      <div className="down">
        <DownIcon size={30} onClick={decrease} />        
      </div>
      <div className="content">
        {countRecord.name} ( {countRecord.count} )
      </div>
      <div className="up">
        <UpIcon size={30} onClick={increase} />        
      </div>
    </Swipeable>
  );
};

export default injectSheet(styles)(KyatButton);
