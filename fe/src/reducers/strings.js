export default (state = {}, action) => {
  switch (action.type) {
    case "FETCH_STRINGS": {
      const strings = action.payload;

      return { ...state, ...strings };
    }

    case "ADD_STRING": {
      const { key } = action.payload;
      return { ...state, [key]: action.payload };
    }
    default:
      return state;
  }
};
