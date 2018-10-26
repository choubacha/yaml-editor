export default (state = { keys: [] }, action) => {
  switch (action.type) {
    case "FETCH_KEYS":
      const keys = action.payload;

      return { ...state, keys: [...keys] };
    default:
      return state;
  }
};
