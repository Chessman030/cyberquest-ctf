'use client'

import { useEffect, ReactNode } from 'react'

export default function LayoutClient({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Flag 4: Insecure Cookie - Base64 encoded: CyberQuest{c00k135_4r3_pl41nt3xt}
    document.cookie = "session_backup=Q3liZXJRdWVzdHtjMDBrMTM1XzRyM19wbDQxbnQzeHR9; path=/; max-age=31536000"

    // Flag 5: LocalStorage Leak
    localStorage.setItem('offline_sync_key', 'CyberQuest{l0c4l_5t0r4g3_n3v3r_f0rg3t5}')

    // Flag 7: Global Window Object - Function to reveal flag
    ;(window as any).revealFlag = () => {
      console.log("CyberQuest{g00d_0ld_c0n50l3_h4ck1ng}")
      alert("🚩 Flag found! Check console for the flag.")
    }

    // Also expose it to be callable from console
    console.log("Hint: Try calling revealFlag() in the console!")

  }, [])

  return <>{children}</>
}
