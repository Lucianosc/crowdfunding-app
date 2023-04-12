import React from 'react'

import { DisplayCampaigns } from '../components'

export default function Profile({ campaignsFilter }) {
  return (
    <DisplayCampaigns
      campaignsFilter={campaignsFilter}
      title="My campaigns"
      isFilteredByOwner={true}
    />
  )
}
