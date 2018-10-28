export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_ENTITIES": {
      const entities = action.payload;

      return [...entities];
    }

    default:
      return state;
  }
};
