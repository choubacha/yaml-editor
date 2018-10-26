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

export default {
  entities: {
    get: (key, params) => {
      axios
        .get("/entities", params)
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  strings: {
    get: (key, _params = { key }) => {
      axios
        .get(`/strings/{key}`)
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    post: (key, params) => {},
    put: (key, params) => {},
    delete: key => {}
  }
};

// api.strings.get(key, params?)
// api.strings.put(key, params)
// api.strings.post(key, params)
// api.strings.delete(key)
