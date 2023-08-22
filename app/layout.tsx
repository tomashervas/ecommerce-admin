import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ModalProvider } from '@/providers/modalProvider'
import { ToasterProvider } from '@/providers/toastProvider'
import { ThemeProvider } from '@/providers/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin Dashboard whith Next.js 13',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            <ToasterProvider />
            <ModalProvider />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
