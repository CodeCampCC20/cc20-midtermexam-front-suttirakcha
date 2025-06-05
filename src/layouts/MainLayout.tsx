import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

function MainLayout() {
  return (
    <main>
      <Navbar />
      <div className="p-8">
        <Outlet />
      </div>
    </main>
  )
}

export default MainLayout