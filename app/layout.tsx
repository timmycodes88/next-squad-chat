import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { cn } from '@/lib/utils'
import ToastProvider from '@/components/providers/ToastProvider'
import ModalProvider from '@/components/providers/ModalProvider'
import SocketProvider from '@/components/providers/SocketProvider'
import QueryProvider from '@/components/providers/QueryProvider'

const font = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Squad Chat',
  description: 'Squad Chat by BrightSideDeveloper',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang='en' suppressHydrationWarning>
        <body className={cn(font.className, 'bg-white dark:bg-[#313338]')}>
          <ThemeProvider
            attribute='class'
            defaultTheme='dark'
            enableSystem
            storageKey='squad-chat-theme'
          >
            <SocketProvider>
              <QueryProvider>
                <ModalProvider />
                <ToastProvider />
                {children}
              </QueryProvider>
            </SocketProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
