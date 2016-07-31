const initialState = {
  points: [
    { x0: 0, y0: 20, x1: 500, y1: 20 },
    { x0: 500, y0: 20, x1: 1000, y1: 300 },
    { x0: 1000, y0: 300, x1: 2500, y1: 320 },
    { x0: 2500, y0: 320, x1: 4500, y1: 80 },
    { x0: 4500, y0: 80, x1: 25000, y1: 80 },
  ],
};

export default function track(state = initialState, action) {
  return state;
}
