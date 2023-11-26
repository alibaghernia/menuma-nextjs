import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const appDomain = process.env.NEXT_PUBLIC_MENUMA_DOMAIN;
  if (!appDomain) {
    console.log("check app domain");
    process.exit(1)
  }
  const url = new URL(request.url);
  console.log({
    host: request.headers.get('host')
  });
  console.log(" ---------------------- ", `${url.protocol}//${appDomain}/`, " ---------------------- ", `${url.protocol}//${appDomain}/_next`, " ---------------------- ", `${url.protocol}//localhost`);
  const reqUrl = request.url.replace('localhost', request.headers.get('host') || '')
  if (
    !reqUrl.startsWith(`http://${appDomain}/`) &&
    !reqUrl.startsWith(`https://${appDomain}/`) &&
    !reqUrl.startsWith(`http://${appDomain}/_next`) &&
    !reqUrl.startsWith(`https://${appDomain}/_next`) &&
    !reqUrl.startsWith(`http://localhost`) &&
    !reqUrl.startsWith(`https://localhost`)
  ) {
    const domain_name = request.headers.get('host')?.split(".") || [];

    return NextResponse.rewrite(new URL(
        `${url.protocol}//${url.host}/${(domain_name.length > 1 ? domain_name[domain_name.length - 2] : domain_name.toString())}`, request.url
    ));
  }
}
