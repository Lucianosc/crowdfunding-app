import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Sidebar, Navbar } from './components'
import { Home, Profile, CreateCampaign, CampaignDetails } from './pages/index'
import { useThemeContext } from './context/ThemeContext'

export default function App() {
  const { isDarkTheme } = useThemeContext()

  return (
    <div
      className={`flex flex-row p-4 min-h-screen ${
        isDarkTheme ? 'dark' : 'light'
      } bg-[var(--color-black)]`}
    >
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>

      <div className="flex flex-col max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Create-campaign" element={<CreateCampaign />} />
          <Route path="/Campaign-details/:id" element={<CampaignDetails />} />
        </Routes>
      </div>
    </div>
  )
}
