import React, { Fragment, useState } from 'react'
import { TripsList, TripsMap } from 'src/components'
import { Layout } from 'src/ui'
import { TripItem, TripsData } from 'src/types'
import { v4 as uuid } from 'uuid'
import camelcaseKeys from 'camelcase-keys'

import rawData from './trips-data.json'

// if this array gets big, we can always switch to using Map
const tripsData: TripsData = rawData.reduce((acc, trip) => {
  return {
    ...acc,
    [uuid()]: (camelcaseKeys(trip) as unknown) as TripItem
  }
}, {})

export const App: React.FC = () => {
  const [currentTripId, setCurrentTripId] = useState<string | null>(null)

  return (
    <Fragment>
      <Layout
        mapElement={
          <TripsMap currentTripId={currentTripId} trips={tripsData} />
        }
        listElement={
          <TripsList
            onSelectTrip={setCurrentTripId}
            trips={tripsData}
            currentTripId={currentTripId}
          />
        }
      />
    </Fragment>
  )
}
