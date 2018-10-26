import api from "../lib/api";

export const addString = (key, value) => {
  return dispatch => {
    return api.strings.post({ key, value, entity_slug: "testing" }).then(response => {
      dispatch({
        type: "ADD_STRING",
        payload: response.data
      });
    });
  };
};

export const updateString = (key, value) => {
  return dispatch => {
    return api.strings.put(key, { value, entity_slug: "testing" }).then(response => {
      const {
        data: { key, value }
      } = response;

      dispatch({
        type: "UPDATE_STRING",
        payload: { key, value }
      });
    });
  };
};

export const fetchStrings = params => {
  return dispatch => {
    return api.strings.get(params).then(response => {
      let { data: strings } = response;

      dispatch({
        type: "FETCH_STRINGS",
        payload: strings
      });
    });
  };
};
