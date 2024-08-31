'use client'

import { usePathname } from 'next/navigation'

const TopBar = () => {
  const pathname = usePathname()

  const getScreenName = () => {
    switch (pathname) {
      case '/create':
        return 'Create'
      case '/dashboard':
        return 'Dashboard'
      default:
        return 'Home'
    }
  }

  return (
    <div className="bg-white shadow-md p-4 ml-64">
      <h1 className="text-2xl font-bold text-gray-800">{getScreenName()}</h1>
    </div>
  )
}

export default TopBar
