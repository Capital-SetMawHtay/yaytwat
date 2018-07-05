import * as constants from './constants';

export const userDataRequested = () => {
  return {
    type: constants.USER_DATA_REQUESTED,
  }
};

export const userDataFetchSucceeded = (data) => {
  return {
    type: constants.USER_DATA_FETCH_SUCCEEDED,
    data,
  };
};