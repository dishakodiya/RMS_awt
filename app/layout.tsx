import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from "@/components/Navbar";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RMS - Resource Management System",
  description: "Resource Management System",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const user = token ? verifyToken(token) : null;

  // Don't render the main Admin/Approver Navbar if the user is a 'User' role.
  // The User layout has its own PublicNavbar.
  const showAdminNavbar = user && user.role !== 'User';

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {showAdminNavbar && <Navbar user={user} />}
        <div style={{ paddingTop: showAdminNavbar ? '64px' : '0' }}>
          {children}
        </div>
      </body>
    </html>
  );
}
