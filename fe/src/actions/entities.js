import api from "../lib/api";

export const fetchEntities = (params = {}) => {
  return dispatch => {
    return api.entities.get(params).then(response => {
      let { data: entities } = response;

      dispatch({
        type: "FETCH_ENTITIES",
        payload: entities
      });
    });
  };
};
