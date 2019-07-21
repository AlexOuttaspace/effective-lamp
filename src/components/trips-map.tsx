import React, { useMemo } from 'react'
import { css } from 'linaria'
import { TripItem, TripsData, LngLat } from 'src/types'
import ReactMapboxGl, { Layer, Feature, Popup } from 'react-mapbox-gl'

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

const calcMapBounds = (trips: TripsData) => {
  const tripsArray = Object.values(trips)

  const [firstTrip, ...otherTrips] = tripsArray

  return otherTrips.reduce<[LngLat, LngLat]>(
    (
      [[smallestLng, smallestLat], [biggestLng, biggestLat]],
      {
        startStationLongitude,
        startStationLatitude,
        endStationLongitude,
        endStationLatitude
      }
    ) => {
      console.log(startStationLatitude, endStationLatitude)
      return [
        [
          Math.min(startStationLongitude, endStationLongitude, smallestLng),
          Math.min(startStationLatitude, endStationLatitude, smallestLat)
        ],
        [
          Math.max(startStationLongitude, endStationLongitude, biggestLng),
          Math.max(startStationLatitude, endStationLatitude, biggestLat)
        ]
      ]
    },
    [
      [firstTrip.startStationLongitude, firstTrip.startStationLatitude],
      [firstTrip.endStationLongitude, firstTrip.endStationLatitude]
    ]
  )
}

export const TripsMap: React.FC<TripsMapProps> = ({
  center,
  trips,
  currentTripId
}) => {
  const fitBounds = useMemo<[LngLat, LngLat]>(() => {
    return calcMapBounds(trips)
  }, [trips])

  console.log(fitBounds)

  return (
    <Map
      onDragEnd={console.log}
      className={mapStyles}
      fitBounds={fitBounds as [LngLat, LngLat]}
      style="mapbox://styles/mapbox/streets-v8" // eslint-disable-line react/style-prop-object
    >
      <Layer type="symbol" id="marker">
        {Object.entries(trips).map(([tripId, trip]) => (
          <Feature
            key={tripId}
            coordinates={[
              trip.startStationLatitude,
              trip.startStationLongitude
            ]}
          />
        ))}
      </Layer>
    </Map>
  )
}
