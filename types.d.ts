import { NextRequest } from "next/server";

declare module "next/server" {
  interface NextRequest {
    isNotMenuma?: boolean;
  }
}
