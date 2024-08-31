'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path ? 'bg-indigo-700 text-white' : 'text-gray-300 hover:bg-indigo-600 hover:text-white'
  }

  return (
    <div className="bg-indigo-800 w-64 h-full fixed left-0 top-0 p-4">
      <nav className="space-y-2">
        <Link href="/create" className={`block px-4 py-2 rounded ${isActive('/create')}`}>
          Create
        </Link>
        <Link href="/dashboard" className={`block px-4 py-2 rounded ${isActive('/dashboard')}`}>
          Dashboard
        </Link>
      </nav>
    </div>
  )
}

export default Sidebar
