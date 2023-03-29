import React from 'react'

import { DisplayCampaigns } from '../components'

export default function Profile() {
  return <DisplayCampaigns title="My campaigns" isFilteredByOwner={true} />
}
