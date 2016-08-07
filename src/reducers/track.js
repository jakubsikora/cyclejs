import { generateTrack } from '../utils';

const data = [
 { length: 40, elevation: 0 },
 { length: 20, elevation: 18 },
 { length: 20, elevation: 5 },
 { length: 20, elevation: 8 },
 { length: 50, elevation: -3 },
 { length: 200, elevation: 0 },
];

const initialState = {
  points: generateTrack(data),
};

export default function track(state = initialState, action) {
  return state;
}
