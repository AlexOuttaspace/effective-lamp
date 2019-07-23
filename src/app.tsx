import React, { Fragment, useState, useEffect } from 'react'
import { TripsList, TripsMap } from 'src/components'
import { Layout } from 'src/ui'
import { TripItem, TripsData } from 'src/types'
import { v4 as uuid } from 'uuid'
import camelcaseKeys from 'camelcase-keys'
import csvtojson from 'csvtojson'

const normalizeTripsData = (rawData: any[]) =>
  rawData.reduce((acc, trip) => {
    return {
      ...acc,
      [uuid()]: (camelcaseKeys(trip) as unknown) as TripItem
    }
  }, {})

const useTripsData = (): TripsData => {
  const [trips, setTrips] = useState<TripsData>({})

  useEffect(() => {
    fetch('/data.csv')
      .then((res) => res.text())
      .then((text) => csvtojson().fromString(text))
      .then((data) => normalizeTripsData(data.slice(0, 100)))
      .then((trips) => setTrips(trips))
      .catch((error) => console.log(error)) // eslint-disable-line no-console
  }, [])

  return trips
}

export const App: React.FC = () => {
  const [currentTripId, setCurrentTripId] = useState<string | null>(null)
  const tripsData = useTripsData()

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
