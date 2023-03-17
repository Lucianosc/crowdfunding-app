import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Sidebar, Navbar } from './components'
import { Home, Profile, CreateCampaign, CampaignDetails } from './pages/index'

export default function App() {
  return (
    <div className="flex flex-row p-4 min-h-screen bg-[#13131a]">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>

      <div className="flex flex-col max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Profile" element={<Profile />} /> 
          <Route path="/Create-campaign" element={<CreateCampaign />} />
          {/* <Route path="/CampaignDetails" element={<CampaignDetails />} />  */}
        </Routes>
      </div>
    </div>
  )
}
