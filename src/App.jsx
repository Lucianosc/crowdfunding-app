import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Profile, CreateCampaign, CampaignDetails } from "./pages/index";

export default function App() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Crowd funding web3 app!</h1>
      <div>Sidebar</div>
      <div>
        Navbar
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/CreateCampaign" element={<CreateCampaign />} />
          <Route path="/CampaignDetails" element={<CampaignDetails />} />
        </Routes>
      </div>
    </div>
  );
}
