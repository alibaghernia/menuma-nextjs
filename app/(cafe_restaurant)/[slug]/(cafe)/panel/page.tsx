import { RedirectType, redirect } from 'next/navigation';

export default function Panel() {
  const panelUrl = process.env.NEXT_PUBLIC_PANEL_URL;
  if (!panelUrl) {
    console.log('Check panel url env');
    process.exit(1);
  }
  redirect(panelUrl, RedirectType.replace);
}
