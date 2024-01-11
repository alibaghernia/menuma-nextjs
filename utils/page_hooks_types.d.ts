import { ParsedUrlQueryInput } from 'node:querystring';

declare interface UrlObject {
  auth?: string | null | undefined;
  hash?: string | null | undefined;
  host?: string | null | undefined;
  hostname?: string | null | undefined;
  href?: string | null | undefined;
  pathname?: string | null | undefined;
  protocol?: string | null | undefined;
  search?: string | null | undefined;
  slashes?: boolean | null | undefined;
  port?: string | number | null | undefined;
  query?: string | null | ParsedUrlQueryInput | undefined;
}
declare type Url = UrlObject | string;
declare interface TransitionOptions {
  shallow?: boolean;
  locale?: string | false;
  scroll?: boolean;
  unstable_skipClientCache?: boolean;
}
