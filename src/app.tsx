import React from 'react'
import { TripsList, TripsMap } from 'src/components'
import { Layout } from 'src/ui'

export const App: React.FC = () => {
  return (
    <Layout>
      <TripsList />
      <TripsMap />
    </Layout>
  )
}
