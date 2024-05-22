import { DecodedToken } from 'token'

declare module 'express' {
  interface Request {
    token?: DecodedToken;
  }

  interface Express {
    // _router: {
    //   params: unknown;
    //   _params: unknown[];
    //   caseSensitive: boolean;
    //   mergeParams: unknown;
    //   strict: boolean;
    //   stack: {
    //     handle: {
    //       params: unknown;
    //       _params: unknown;
    //       caseSensitive: boolean;
    //       mergeParams: unknown;
    //       strict: boolean;
    //       stack: {
            
    //       }[]
    //     },
    //     name: string,
    //     params: unknown,
    //     path: unknown,
    //     keys: unknown[],
    //     regexp: RegExp,
    //     route: unknown
    //   }[]
    // }; 
  }
}