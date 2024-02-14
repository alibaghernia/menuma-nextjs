import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const appDomain = process.env.NEXT_PUBLIC_MENUMA_DOMAIN;
  if (!appDomain) {
    console.log('check app domain');
    process.exit(1);
  }
  const url = new URL(request.url);
  const host = request.headers.get('host');
  const protocol =
    `${request.headers.get('x-forwarded-proto')}:` || url.protocol;
  const reqUrl = request.url.replace(`${url.host}`, host || '');
  if (
    !reqUrl.startsWith(`http://${appDomain}/`) &&
    !reqUrl.startsWith(`https://${appDomain}/`) &&
    !reqUrl.startsWith(`http://${appDomain}/_next`) &&
    !reqUrl.startsWith(`https://${appDomain}/_next`) &&
    !reqUrl.startsWith(`${protocol}//${host}/_next`) &&
    !reqUrl.startsWith(`http://localhost`) &&
    !reqUrl.startsWith(`https://localhost`) &&
    !reqUrl.startsWith(`http://test.`) &&
    !reqUrl.startsWith(`https://test.`) &&
    !reqUrl.startsWith(`http://192.168.`) &&
    !reqUrl.startsWith(`http://172.`) &&
    !reqUrl.startsWith(`https://172.`) &&
    !reqUrl.startsWith(`https://192.168.`)
  ) {
    const domain_name = host?.split('.') || [];
    // const nginxUrl = `${protocol}//${host}`;
    const nextUrl = `${url.protocol}//${url.host}`;
    const username = (
      domain_name.length > 1
        ? domain_name[domain_name.length - 2]
        : domain_name.toString()
    ).replace(/:(\d+)/, '');
    const pathname = request.url.replace(nextUrl, '');
    request.headers.set('isNotMenuma', '1');
    return NextResponse.rewrite(`${nextUrl}/${username}${pathname}`, {
      headers: request.headers,
    });
  }
  request.headers.set('isNotMenuma', '0');
  return NextResponse.next({
    headers: request.headers,
  });
}
