import type { Metadata } from 'next';
import '../globals.css';
import Sidebar from '@components/sidebar/sidebar';

export const metadata: Metadata = {
  title: 'Balabook - Clone',
  description: 'App for RASA',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Uncomment this block if you want to redirect unauthenticated users to login page
  // if (!session || !session.user) {
  //   redirect("/login");
  // }

  return (
    <div className="flex w-full sm:flex-row">
      <div className="flex-grow ">{children}</div>
    </div>
  );
}
