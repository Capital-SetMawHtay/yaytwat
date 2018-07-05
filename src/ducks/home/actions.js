import * as constants from './constants';

const userDataRequested = () => {
  return {
    type: constants.USER_DATA_REQUESTED,
  }
};

const userDataFetchSucceeded = (data) => {
  return {
    type: constants.USER_DATA_FETCH_SUCCEEDED,
    data,
  };
};

export default {
  userDataRequested,
  userDataFetchSucceeded,
};
