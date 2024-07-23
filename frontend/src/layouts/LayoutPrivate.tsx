
import { Outlet } from 'react-router-dom'
import Navbar from '../shared/components/Navbar'
import Footer from '../shared/components/Footer'

const LayoutPublic = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default LayoutPublic