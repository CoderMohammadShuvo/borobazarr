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
      {/* Sidebar for larger screens */}
      <div className="hidden lg:block"></div>
      {/* Navbar for mobile and tablet devices */}
      <div className="lg:hidden block mt-10"></div>
      {/* Main content */}
      <div className="flex-grow mt-10">{children}</div>
    </div>
  );
}
