import React from 'react'
import { styled } from 'linaria/react'
import { TripsData } from 'src/types'

const Root = styled.ul`
  width: 200px;
`

interface TripsListProps {
  trips: TripsData
  currentTripId: string | null
  onSelectTrip: (tripId: string) => void
}

export const TripsList: React.FC<TripsListProps> = ({
  trips,
  onSelectTrip
}) => (
  <Root>
    {Object.keys(trips).map((tripId) => (
      <button key={tripId} onClick={() => onSelectTrip(tripId)}>
        {tripId}
      </button>
    ))}
  </Root>
)
