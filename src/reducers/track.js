const initialState = {
  points: [
    { x0: 0, y0: 20, x1: 400, y1: 20 },
    { x0: 400, y0: 20, x1: 600, y1: 100 },
    { x0: 600, y0: 100, x1: 2500, y1: 320 },
    { x0: 2500, y0: 320, x1: 4500, y1: 80 },
    { x0: 4500, y0: 80, x1: 25000, y1: 80 },
    { x0: 25000, y0: 80, x1: 25000, y1: 80 },
  ],
};

export default function track(state = initialState, action) {
  return state;
}
