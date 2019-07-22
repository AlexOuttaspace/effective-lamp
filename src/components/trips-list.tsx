import React from 'react'
import { styled } from 'linaria/react'
import { TripsData } from 'src/types'

import { TripsItem } from './trips-item'

const Root = styled.ul`
  padding-left: 1rem;
  padding-right: 1rem;
  height: 100%;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 0.5rem;
  }

  ::-webkit-scrollbar-track {
    background-color: #f7f5fa;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #eddbfb;
    outline: 1px solid #eddbfb;
  }
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
