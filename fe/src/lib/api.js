// Entity
// type: [:engine, :root, :gem]
// name: str
// path: str

// String
// key: str
// value: str
// entity: str

// Routes
// GET /entities

// GET /strings/:key => String
// PUT /strings/:key
// POST /strings/:key
// DELETE /strings/:key
// GET /strings
// GET /strings?filter[prefix]=activerecord.errors
// GET /strings?filter[includes]=error
// GET /strings?filter[entity-name]=organic
// GET /strings?filter[entity-name]=backend
// GET /strings?filter[entity-name]=root

const axios = require("axios");
const qs = require("qs");

const host = "http://localhost:3000";

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
