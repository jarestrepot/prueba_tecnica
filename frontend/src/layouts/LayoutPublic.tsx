
import { Outlet } from 'react-router-dom'
import Footer from '../shared/components/Footer'

const LayoutPublic = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow m-4 grid place-items-center">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default LayoutPublic