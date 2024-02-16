import { useContext } from 'react';
import { ProviderContext } from './provider';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';

export function useSlug(traillingSlash: boolean = true) {
  const { isNotMenuma } = useContext(ProviderContext);
  const params = useParams();
  const slug = isNotMenuma ? `` : params?.slug;
  return traillingSlash && slug ? `${slug}/` : slug;
}
