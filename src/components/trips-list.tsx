import React from 'react'
import { styled } from 'linaria/react'
import { TripsData } from 'src/types'

import { TripsItem } from './trips-item'

const Root = styled.ul`
  padding-left: 1rem;
  padding-right: 1rem;
`

interface TripsListProps {
  trips: TripsData
  currentTripId: string | null
  onSelectTrip: (tripId: string) => void
}

export const TripsList: React.FC<TripsListProps> = ({
  trips,
  onSelectTrip,
  currentTripId
}) => (
  <Root>
    {Object.entries(trips).map(([tripId, trip]) => (
      <TripsItem
        onSelectTrip={onSelectTrip}
        isSelected={tripId === currentTripId}
        key={tripId}
        id={tripId}
        {...trip}
      />
    ))}
  </Root>
)
