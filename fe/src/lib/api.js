const axios = require("axios");
const qs = require("qs");

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.baseURL = "http://localhost:3000";

export default {
  entities: {
    get: _params => {
      return axios.get("/entities");
    }
  },
  strings: {
    get: (params = {}) => {
      let { key, ...rest } = params;
      let url = `/strings/`;

      if (key) {
        url = `${url}/${key}`;
      }

      url = `${url}?${qs.stringify(rest)}`;

      return axios.get(url);
    },
    post: (params = {}) => {
      return axios.post(`/strings`, params);
    },
    put: (key, params = {}) => {
      const url = `/strings/${key}`;

      return axios.put(url, params);
    },
    delete: key => {
      return axios.delete(`/strings/${key}`);
    }
  }
};
