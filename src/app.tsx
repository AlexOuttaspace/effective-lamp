import React, { Fragment, useState } from 'react'
import { TripsList, TripsMap } from 'src/components'
import { Layout } from 'src/ui'
import { TripItem, TripsData, LngLat } from 'src/types'
import { v4 as uuid } from 'uuid'
import camelcaseKeys from 'camelcase-keys'

import rawData from './trips-data.json'

const tripsData: TripsData = rawData.reduce((acc, trip) => {
  return {
    ...acc,
    [uuid()]: (camelcaseKeys(trip) as unknown) as TripItem
  }
}, {})

export const App: React.FC = () => {
  const [center, setCenter] = useState<LngLat>([-0.2416815, 51.5285582])
  const [currentTripId, setCurrentTripId] = useState<string | null>(null)
  console.log(currentTripId && tripsData[currentTripId])
  return (
    <Fragment>
      <button onClick={() => setCurrentTripId(Object.keys(tripsData)[0])}>
        123
      </button>
      <Layout
        mapElement={
          <TripsMap
            currentTripId={currentTripId}
            trips={tripsData}
            center={center}
          />
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
