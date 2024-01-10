import { type IncomingHttpHeaders } from 'http';

declare module 'http' {
  interface IncomingHttpHeaders {
    isNotMenuma?: string;
  }
}
