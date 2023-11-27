import { useContext } from "react";
import { ProviderContext } from "./provider";
import { useParams } from "next/navigation";

export function useSlug(traillingSlash: boolean = true) {
  const { state } = useContext(ProviderContext);
  const params = useParams();

  const slug = state.isNotMenuma ? `` : params?.slug;
  return traillingSlash ? `${slug}/` : slug;
}
