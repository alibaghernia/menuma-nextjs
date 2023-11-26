import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const appDomain = process.env.NEXT_PUBLIC_MENUMA_DOMAIN;
  if (!appDomain) {
    console.log("check app domain");
    process.exit(1)
  }
  const url = new URL(request.url);
  console.log(" ---------------------- ", `${url.protocol}//${appDomain}/`, " ---------------------- ", `${url.protocol}//${appDomain}/_next`, " ---------------------- ", `${url.protocol}//localhost`);
  if (
    !request.url.startsWith(`${url.protocol}//${appDomain}/`) &&
    !request.url.startsWith(`${url.protocol}//${appDomain}/_next`) &&
    !request.url.startsWith(`${url.protocol}//localhost`)
  ) {
    const domain_name = url.hostname.split(".");

    return NextResponse.rewrite(new URL(
        `${url.protocol}//${url.host}/${(domain_name.length > 1 ? domain_name[domain_name.length - 2] : domain_name.toString())}`, request.url
    ));
  }
}
