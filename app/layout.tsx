import './globals.css'
import { Inter } from 'next/font/google'
import Layout from './components/Layout'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Content Repurposing SaaS',
  description: 'Repurpose your content across social media platforms',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
