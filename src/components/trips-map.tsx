import React, { useMemo } from 'react'
import { css } from 'linaria'
import { TripItem, TripsData, LngLat } from 'src/types'
import ReactMapboxGl from 'react-mapbox-gl'

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiYWxleG91dHRhc3BhY2UiLCJhIjoiY2p5ZDI2bTRsMGQ5dzNjcW01azIxdGRiciJ9.CtlNSN-Vc6p-_HbAAj9zFQ'
})

const mapStyles = css`
  height: 100%;
  width: 100%;
`

interface TripsMapProps {
  center: LngLat
  trips: TripsData
  currentTripId: string | null
}

export const TripsMap: React.FC<TripsMapProps> = ({
  center,
  trips,
  currentTripId
}) => {
  const fitBounds = useMemo<[LngLat, LngLat] | undefined>(() => {
    if (currentTripId === null || !trips[currentTripId]) return undefined

    const selectedTrip = trips[currentTripId]

    const {
      startStationLongitude,
      startStationLatitude,
      endStationLongitude,
      endStationLatitude
    } = selectedTrip

    return [
      [startStationLongitude, startStationLatitude],
      [endStationLongitude, endStationLatitude]
    ]
  }, [trips, currentTripId])

  return (
    <Map
      onDragEnd={console.log}
      center={center}
      className={mapStyles}
      fitBounds={fitBounds as [LngLat, LngLat]}
      style="mapbox://styles/mapbox/streets-v8" // eslint-disable-line react/style-prop-object
    />
  )
}
