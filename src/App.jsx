import { Outlet } from 'react-router'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {

  return (
    <>
      <div className="min-h-screen bg-gray-950 text-white flex flex-col">
        <Navbar />

        {/* Outlet renders whichever child page matches the current URL */}
        <main className="flex-1">
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  )
}

export default App;
