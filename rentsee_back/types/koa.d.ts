import { Context } from 'koa';

declare module 'koa' {
  interface Context {
    state: {
      // koa-jwt
      user: {
        _id: string;
        username: string;
      };
      jwtOriginalError?: any;
    };
  }
}
// declare namespace Express { // MUST be namespace, and not declare module "Express" {
//   export interface Request {
//     Bla: string;
//   }
// }

// declare module 'koa' {
//   declare namespace Application {}
// }
