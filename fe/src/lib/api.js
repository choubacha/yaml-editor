const axios = require("axios");
const qs = require("qs");

const host = "http://localhost:3000";

axios.defaults.headers.post["Content-Type"] = "application/json";

export default {
  entities: {
    get: (key, params) => {
      return axios.get("/entities", params);
    }
  },
  strings: {
    get: (params = {}) => {
      let url = `${host}/strings/`;

      if (params.key) {
        url = `${url}/${key}`;

        let { key, ...params } = params;
      }

      url = `${url}?${qs.stringify(params)}`;

      return axios.get(url);
    },
    post: (params = {}) => {
      return axios.post(`${host}/strings`, params);
    },
    put: (key, params = {}) => {
      const url = `${host}/strings/${key}`;

      return axios.put(url, params);
    },
    delete: key => {
      return axios.delete(`/strings/${key}`);
    }
  }
};
