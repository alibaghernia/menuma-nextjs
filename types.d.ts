import { NextRequest } from 'next/server';

declare module 'next/server' {
  interface NextRequest {
    isNotMenuma?: boolean;
  }
}
declare module 'pannellum-react' {
  function Pannellum(props: any): JSX.Element;
}
