import Sidebar from './Sidebar'
import TopBar from './TopBar'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 ml-64">
        <TopBar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}

export default Layout
