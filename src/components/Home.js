import React from 'react';
import { connect } from "react-redux";
import { homeActions, homeSelectors } from "../ducks/home";
import injectSheet from 'react-jss';
import Color from "color";
import Navbar from './Navbar';
import KyatButton from './KyatButton';

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
  summaryPanel: {
    display: 'flex',
    flexDirection: 'row',
    width: '100vw',
    boxSizing: 'border-box',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: Color(theme.colorPrimary).darken(0.3).string(),
    color: 'white',
    width: '100vw',
    height: 70,
    textAlign: 'center',
    fontSize: 16,
    boxShadow: 'none',
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

  save = () => {
    this.props.save(this.props.user, { ...this.props.data });
  }

  render() {
    const {
      user,
      home,
      counts,
      classes,
      currentTotal,
      previousTotal,
      saving,
      loading,
      error,
    } = this.props;

    if(loading) {
      return <div>
        Loading....
      </div>
    }

    return (
      <div className={classes.container}>
        <Navbar />
        <div>
          <div className={classes.summaryPanel}>
            <p>Previous total: { previousTotal }</p>
            <p>Current total: { currentTotal }</p>
          </div>
          { saving ? 'Saving...' : null }
          { error ?  'Save failed.' : null }
          <div className={classes.buttonsContainer}>
            {
              counts.map(countRecord => {
                return (
                  <KyatButton
                    key={countRecord.name}
                    countRecord={countRecord}
                    increase={this.props.increaseCount.bind(this, countRecord.name)}
                    decrease={this.props.decreaseCount.bind(this, countRecord.name)} />
                )
              })
            }
          </div>
          <div>
            <button type="submit" className={classes.saveButton} onClick={this.save}>Save</button>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    requestData: (user) => dispatch(homeActions.userDataRequested(user)),
    increaseCount: (categoryName) => dispatch(homeActions.increaseCount(categoryName)),
    decreaseCount: (categoryName) => dispatch(homeActions.decreaseCount(categoryName)),
    save: (user, data) => dispatch(homeActions.save(user, data))
  };
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    home: state.home,
    data: state.home.data,
    currentTotal: homeSelectors.getCurrentTotal(state),
    previousTotal: homeSelectors.getPreviousTotal(state),
    counts: state.home.data.counts,
    saving: state.home.data.saving,
    error: state.home.data.error,
    loading: state.home.loading,
  };
}

export default injectSheet(styles)(connect(mapStateToProps, mapDispatchToProps)(Home));
