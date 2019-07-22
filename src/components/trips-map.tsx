import React, { useMemo, Fragment } from 'react'
import { css } from 'linaria'
import { styled } from 'linaria/react'
import { TripItem, TripsData, LngLat } from 'src/types'
import ReactMapboxGl, { Marker, Popup } from 'react-mapbox-gl'

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiYWxleG91dHRhc3BhY2UiLCJhIjoiY2p5ZDI2bTRsMGQ5dzNjcW01azIxdGRiciJ9.CtlNSN-Vc6p-_HbAAj9zFQ'
})

const mapStyles = css`
  height: 100%;
  width: 100%;
`

const getTripStartCoords = ({
  startStationLongitude,
  startStationLatitude
}: TripItem): LngLat => [startStationLongitude, startStationLatitude]

const getTripEndCoords = ({
  endStationLongitude,
  endStationLatitude
}: TripItem): LngLat => [endStationLongitude, endStationLatitude]

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
    ) => [
      [
        Math.min(startStationLongitude, endStationLongitude, smallestLng),
        Math.min(startStationLatitude, endStationLatitude, smallestLat)
      ],
      [
        Math.max(startStationLongitude, endStationLongitude, biggestLng),
        Math.max(startStationLatitude, endStationLatitude, biggestLat)
      ]
    ],
    [getTripStartCoords(firstTrip), getTripEndCoords(firstTrip)]
  )
}

const MarkerInner = styled.div<{ isSelected: boolean }>`
  border-radius: 50%;
  position: relative;
  height: 1rem;
  width: 1rem;
  background-color: ${(p) => (p.isSelected ? 'blue' : 'red')};
  z-index: ${(p) => (p.isSelected ? 1 : 0)};
  box-shadow: 0 0 1px blue;
  transition: transform 0.2s ease-in-out;
  transform: ${(p) => (p.isSelected ? 'scale(1.5)' : 'none')};
`

interface TripsMapProps {
  trips: TripsData
  currentTripId: string | null
}

const fitBoundsOptions = {
  padding: { top: 50, left: 50, bottom: 50, right: 50 }
}

export const TripsMap: React.FC<TripsMapProps> = ({ trips, currentTripId }) => {
  const fitBounds = useMemo<[LngLat, LngLat]>(() => calcMapBounds(trips), [
    trips
  ])

  const currentTrip = currentTripId && trips[currentTripId]

  return (
    <Map
      className={mapStyles}
      fitBounds={fitBounds}
      fitBoundsOptions={fitBoundsOptions}
      style="mapbox://styles/mapbox/streets-v8" // eslint-disable-line react/style-prop-object
    >
      <Fragment>
        {Object.entries(trips).map(([tripId, trip]) => {
          const isSelected = tripId === currentTripId
          const startStationCoords = getTripStartCoords(trip)
          const endStationCoords = getTripEndCoords(trip)

          return (
            <Fragment key={tripId}>
              <Marker
                anchor="top"
                style={{ zIndex: isSelected ? 1 : 0 }}
                coordinates={startStationCoords}
              >
                <MarkerInner isSelected={isSelected} />
              </Marker>
              <Marker
                anchor="top"
                style={{ zIndex: isSelected ? 1 : 0 }}
                coordinates={endStationCoords}
              >
                <MarkerInner isSelected={isSelected} />
              </Marker>
            </Fragment>
          )
        })}
        {currentTrip && (
          <Fragment>
            <Popup coordinates={getTripStartCoords(currentTrip)}>
              <div>123</div>
            </Popup>
            <Popup coordinates={getTripEndCoords(currentTrip)}>
              <div>123</div>
            </Popup>
          </Fragment>
        )}
      </Fragment>
    </Map>
  )
}
