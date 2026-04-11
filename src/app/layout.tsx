import type { Metadata } from 'next'
import './globals.css'
import LayoutClient from './layout-client'

export const metadata: Metadata = {
  title: 'ISTE Capture The Flag Competition',
  description: 'Online programming competition platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        {/* Hidden DOM Element */}
        <span style={{ display: 'none' }}>{'CyberQuest{d15pl4y_n0n3_15_n0t_53cur3}'}</span>
        
        {/* Render actual HTML comment - visible in Inspect */}
        <div dangerouslySetInnerHTML={{ __html: '<!-- TODO: Remove backup flag: CyberQuest{c0mm3nt5_l34k_d4t4} before launch -->' }} />
        
        <LayoutClient>
          {children}
        </LayoutClient>
      </body>
    </html>
  )
}