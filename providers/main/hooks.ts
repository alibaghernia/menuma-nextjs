import { useContext } from "react";
import { ProviderContext } from "./provider";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";

export function useSlug(traillingSlash: boolean = true) {
  const { state } = useContext(ProviderContext);
  const { query: params } = useRouter();

  const slug = state.isNotMenuma ? `` : params?.slug;
  return traillingSlash && slug ? `${slug}/` : slug;
}
