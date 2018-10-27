import api from "../lib/api";

const MINIMUM_SEARCH_LENGTH = 3;

export const addString = ({ key, values, entitySlug }) => {
  return dispatch => {
    return api.strings.post({ key, value: values, entity_slug: entitySlug }).then(response => {
      dispatch({
        type: "ADD_STRING",
        payload: response.data
      });
    });
  };
};

export const updateString = (key, value) => {
  return dispatch => {
    return api.strings.put(key, { value }).then(response => {
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
    const {
      filter: { match: matchStr }
    } = params;

    if (matchStr.length >= MINIMUM_SEARCH_LENGTH) {
      return api.strings.get(params).then(response => {
        let { data: strings } = response;

        dispatch({
          type: "FETCH_STRINGS",
          payload: strings
        });
      });
    } else {
      dispatch({
        type: "FETCH_STRINGS",
        payload: []
      });
    }
  };
};
