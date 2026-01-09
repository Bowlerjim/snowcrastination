import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Snowcrastination - Defend Your Cabin',
  description: 'A cozy snowball defense game. Defend your cabin from falling snow.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
