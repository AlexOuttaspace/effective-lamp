import React, { useMemo, Fragment } from 'react'
import { css } from 'linaria'
import { styled } from 'linaria/react'
import { TripsData, LngLat } from 'src/types'
import {
  getTripStartCoords,
  getTripEndCoords,
  calcMapBounds
} from 'src/helpers'
import ReactMapboxGl, { Marker, Popup } from 'react-mapbox-gl'

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiYWxleG91dHRhc3BhY2UiLCJhIjoiY2p5ZDI2bTRsMGQ5dzNjcW01azIxdGRiciJ9.CtlNSN-Vc6p-_HbAAj9zFQ'
})

const mapStyles = css`
  height: 100%;
  width: 100%;
`

const StationName = styled.h2`
  font-size: 1.3rem;
`

const MarkerInner = styled.div<{
  isSelected: boolean
  isEnd?: boolean
  sizeMultiplier: number
}>`
  --marker-color: ${(p) =>
    p.isEnd ? 'var(--destination-color)' : 'var(--departure-color)'};
  --marker-size: ${(p) => p.sizeMultiplier * 0.001 + 1};

  border-radius: 50%;
  position: relative;
  height: 1rem;
  width: 1rem;
  background-color: ${(p) => (p.isSelected ? 'var(--marker-color)' : '#ccc')};
  z-index: ${(p) => (p.isSelected ? 1 : 0)};
  box-shadow: 0 0 1px blue;
  transition: ${(p) => (p.isSelected ? 'all 0.3s ease-out' : 'none')};
  transform: ${(p) => (p.isSelected ? 'scale(var(--marker-size))' : 'none')};
  box-shadow: 0 0 12px 2px
    ${(p) => (p.isSelected ? 'var(--marker-color)' : 'none')};
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
      style="mapbox://styles/alexouttaspace/cjydo73es0wqf1co2xs5ly8z7" // eslint-disable-line react/style-prop-object
    >
      <Fragment>
        {Object.entries(trips).map(([tripId, trip]) => {
          const isSelected = tripId === currentTripId
          const startStationCoords = getTripStartCoords(trip)
          const endStationCoords = getTripEndCoords(trip)

          return (
            <Fragment key={tripId}>
              <Marker
                anchor="center"
                style={{ zIndex: isSelected ? 1 : 0 }}
                coordinates={startStationCoords}
              >
                <MarkerInner
                  sizeMultiplier={trip.tripduration}
                  isSelected={isSelected}
                />
              </Marker>
              <Marker
                anchor="center"
                style={{
                  zIndex: isSelected ? 1 : 0
                }}
                coordinates={endStationCoords}
              >
                <MarkerInner
                  sizeMultiplier={trip.tripduration}
                  isSelected={isSelected}
                  isEnd
                />
              </Marker>
            </Fragment>
          )
        })}
        {currentTrip && (
          <Fragment>
            <Popup coordinates={getTripStartCoords(currentTrip)}>
              <StationName>{currentTrip.startStationName}</StationName>
            </Popup>

            <Popup coordinates={getTripEndCoords(currentTrip)}>
              <StationName>{currentTrip.endStationName}</StationName>
            </Popup>
          </Fragment>
        )}
      </Fragment>
    </Map>
  )
}
