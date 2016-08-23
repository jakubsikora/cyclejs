import {
  ADD_USER,
} from '../actionTypes';

const initialState = {
  initialized: false,
};

export default function client(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
