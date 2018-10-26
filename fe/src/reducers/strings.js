export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_STRINGS":
      const { strings } = action.payload;
      console.log("exp", state, { ...state, strings });

      return [...strings];
    default:
      return state;
  }
};
