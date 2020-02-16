import * as jwt from 'jsonwebtoken';

import config from './config';

export function sign(payload: string | object) {
  return jwt.sign(payload, config.jwt.secret, {
    // expiresIn: '10h'
  });
}
export function varify(token: string): object | string {
  return jwt.verify(token, config.jwt.secret);
}
