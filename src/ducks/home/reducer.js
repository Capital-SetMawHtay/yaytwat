/* eslint no-multi-spaces: 0 */
import { handleActions }  from 'redux-actions';
import * as actions       from './actions';
import * as constants from './constants';

// The Initial State
const initialCounts = [
  {
    name: '50kyat',
    count: 0,
    value: 50,
  },
  {
    name: '100kyat',
    count: 0,
    value: 100,
  },
  {
    name: '200kyat',
    count: 0,
    value: 200,
  },
  {
    name: '500kyat',
    count: 0,
    value: 500,
  },
  {
    name: '1000kyat',
    count: 0,
    value: 1000,
  },
  {
    name: '5000kyat',
    count: 0,
    value: 5000,
  }, {
    name: '10000kyat',
    count: 0,
    value: 10000,
  },
];

const initialState = {
  firstTime: true,
  data: {
    counts: [...initialCounts],
    lastSubmittedAt: null,
  },
  lastCounts: null,
  saving: false,
  error: null,
  loading: true,
};

const updateCountFor = (counts, name, delta) => {
  return counts.map((countRecord) => {
    if (countRecord.name !== name) {
      return countRecord;
    }
    let sum = countRecord.count + delta;
    if (sum < 0) {
      sum = 0;
    }
    const newCountRecord = { ...countRecord, count: sum };
    return newCountRecord;
  });
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.USER_DATA_FETCH_SUCCEEDED:
      if (action.data == null) {
        return { ...state, loading: false };
      }
      return { ...state, data: { ...state.data, lastSubmittedAt: action.data.lastSubmittedAt }, lastCounts: action.data.counts, loading: false };
    case constants.USER_DATA_FETCH_FAILED:
      if (action.data == null) {
        return { ...state, loading: false };
      }
      return { ...state, data: action.data, loading: false };
    case constants.INCREASE_COUNT:
      return { ...state, data: { ...state.data, counts: updateCountFor(state.data.counts, action.categoryName, 1) } };
    case constants.DECREASE_COUNT:
      return { ...state, data: { ...state.data, counts: updateCountFor(state.data.counts, action.categoryName, -1) } };
    case constants.RESET:
      return { ...state, data: { ...state.data, counts: [...initialCounts] } };
    case constants.SAVING:
      return { ...state, saving: true, error: null };
    case constants.SAVE_SUCCESSFUL:
      return { ...state, saving: false, lastCounts: action.data.counts, data: {counts: [...initialCounts], lastSubmittedAt: action.data.lastSubmittedAt } };
    case constants.SAVE_FAILED:
      return { ...state, saving: false, error: 'Safe failed' };
    default:
      return state;
  }
};
