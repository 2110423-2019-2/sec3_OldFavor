import * as _ from 'lodash';

const result = require('dotenv').config();
if (result.error) {
  throw result.error;
}
console.log(result.parsed);

const config = {
  port: process.env.PORT,
  mongo: {
    // uri: process.env.MONGO_URI,
    db: process.env.MONGO_DB
  },
  jwt: {
    secret: process.env.JWT_SECRET
  }
};

const flattenKeys = (obj, path = []) =>
  !_.isObject(obj)
    ? { [path.join('.')]: obj }
    : _.reduce(obj, (cum, next, key) => _.merge(cum, flattenKeys(next, [...path, key])), {});

for (let [k, v] of _.toPairs(flattenKeys(config))) {
  if (!v) {
    throw new Error(`Config [${k}] is Nil`);
  }
}

export default config;
