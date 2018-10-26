export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_STRINGS": {
      const strings = action.payload;

      return [...strings];
    }

    default:
      return state;
  }
};
