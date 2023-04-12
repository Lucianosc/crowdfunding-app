import React from 'react'
import { DisplayCampaigns } from '../components'

export default function Home({campaignsFilter}) {
  return <DisplayCampaigns campaignsFilter={campaignsFilter} title="All campaigns" />
}
