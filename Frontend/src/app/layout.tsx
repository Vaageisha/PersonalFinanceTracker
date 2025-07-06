import "./globals.css";
import Link from "next/link";
import { ReactNode } from "react";

export const metadata = {
  title: "Personal Finance Visualizer",
  description: "Track your expenses visually",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        {/* Navbar */}
        <nav className="bg-white shadow p-4 flex gap-6">
          <Link href="/dashboard" className="text-blue-600 font-medium hover:underline">
            Dashboard
          </Link>
          <Link href="/add" className="text-blue-600 font-medium hover:underline">
            Add Transaction
          </Link>
          <Link href="/transactions" className="text-blue-600 font-medium hover:underline">
            All Transactions
          </Link>
           <Link href="/budget" className="text-blue-600 font-medium hover:underline">
            All Budgets
          </Link>
        </nav>

        {/* Page Content */}
        <main className="max-w-4xl mx-auto mt-8">{children}</main>
      </body>
    </html>
  );
}
