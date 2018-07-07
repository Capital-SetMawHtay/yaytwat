import { createSelector } from 'reselect';

const getCounts = state => state.home.data.counts;
const getLastCounts = state => state.home.lastCounts;

export const getCurrentTotal = createSelector([getCounts], (counts) => {
  return counts.reduce((acc, kyatCategory) => {
    return acc + (kyatCategory.value * kyatCategory.count);
  }, 0);
});

export const getPreviousTotal = createSelector([getLastCounts], (counts) => {
  if (counts == null) {
    return 0;
  }
  return counts.reduce((acc, kyatCategory) => {
    return acc + (kyatCategory.value * kyatCategory.count);
  }, 0);
});
