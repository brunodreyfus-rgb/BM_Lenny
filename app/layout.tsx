import './style.css';
import type { Metadata } from 'next';

const site = 'https://lenny-bar-mitzvah.vercel.app';
const title = 'Lenny · Bar Mitsvah | 25–27 mars 2027';
const description = 'Une invitation, une expérience unique. Découvrez votre invitation personnalisée, l’histoire de Lenny et le programme des festivités à Ra’anana.';
const image = `${site}/event/whatsapp-invitation-v18.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title,
  description,
  openGraph: {
    title, description, url: site, type: 'website', locale: 'fr_FR',
    images: [{ url: image, width: 900, height: 900, alt: 'Invitation à la Bar Mitsvah de Lenny, du 25 au 27 mars 2027' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: [image] },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <html lang="fr"><body>{children}</body></html>;
}
