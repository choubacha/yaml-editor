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

const host = "http://localhost:3000";

export default {
  entities: {
    get: (key, params) => {
      return axios.get("/entities", params);
    }
  },
  strings: {
    get: (key, params = {}) => {
      let url = `${host}/strings`;

      if (key) {
        url = `${url}/${key}`;
      }

      return axios.get(url);
    },
    post: (params = {}) => {
      return axios.post(`${host}/strings`, params);
    },
    put: (key, params = {}) => {
      console.log("udate", params);
      const url = `${host}/strings/${key}`;

      return axios.put(url, params);
    },
    delete: key => {
      return axios.delete(`/strings/${key}`);
    }
  }
};
