import * as constants from './constants';

export const userDataRequested = (user) => {
  return {
    type: constants.USER_DATA_REQUESTED,
    user,
  }
};

export const userDataFetchSucceeded = (data) => {
  return {
    type: constants.USER_DATA_FETCH_SUCCEEDED,
    data,
  };
};

export const increaseCount = (categoryName) => {
  return {
    type: constants.INCREASE_COUNT,
    categoryName,
  };
};

export const save = (user, data) => {
  return {
    type: constants.SAVE_REQUESTED,
    data,
    user,
  }
}
