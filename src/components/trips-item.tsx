import React, { useCallback } from 'react'
import { styled } from 'linaria/react'
import { TripItem } from 'src/types'
import { format } from 'date-fns'
import { ArrowIcon } from 'src/ui'

const formatInteger = (int: number): string =>
  `${Math.floor(int)}`.padStart(2, '0')

const formatDuration = (duration: number): string => {
  const seconds = formatInteger(duration % 60)
  const minutes = formatInteger(duration / 60)
  const hours = formatInteger(duration / 3600)

  return `${hours}h ${minutes}m ${seconds}s`
}

const DATE_FORMAT = 'YYYY.MM.DD HH:mm'

const StationWrapper = styled.div<{ isEnd?: boolean; isSelected: boolean }>`
  --border-color: ${(p) =>
    p.isEnd ? 'var(--destination-color)' : 'var(--departure-color)'};

  flex-shrink: 0;
  flex-grow: 1;

  width: 12rem;
  padding: 0.5rem;
  border: 2px solid var(--border-color);
  border-radius: 0.8rem;
  transition: box-shadow 0.3s ease-out;
  box-shadow: 0 0 12px 2px
    ${(p) => (p.isSelected ? 'var(--border-color)' : 'none')};
`

const Center = styled.div`
  flex-shrink: 0;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  svg {
    fill: #844da3;
  }
`

const StationName = styled.h2`
  font-size: 1.4rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0.4rem;
`

const Duration = styled.time`
  font-size: 1rem;
`

const Root = styled.li`
  outline: none;
  display: flex;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: #545454;
`

interface TripItemProps extends TripItem {
  id: string
  onSelectTrip(tripId: string): void
  isSelected: boolean
}

export const TripsItem: React.FC<TripItemProps> = ({
  id,
  isSelected,
  onSelectTrip,
  endStationName,
  startStationName,
  tripduration,
  starttime,
  stoptime
}) => {
  const handleSelectTrip = useCallback(() => onSelectTrip(id), [
    id,
    onSelectTrip
  ])

  return (
    <Root
      tabIndex={1}
      onMouseOver={handleSelectTrip}
      onFocus={handleSelectTrip}
    >
      <StationWrapper isSelected={isSelected}>
        <StationName>{startStationName}</StationName>
        <div>
          <div>Departs at:</div>
          <time>{format(starttime, DATE_FORMAT)}</time>
        </div>
      </StationWrapper>

      <Center>
        <Duration>{formatDuration(tripduration)}</Duration>
        <ArrowIcon />
      </Center>

      <StationWrapper isEnd isSelected={isSelected}>
        <StationName>{endStationName}</StationName>
        <div>
          <div>Arrives at:</div>
          <time>{format(stoptime, DATE_FORMAT)}</time>
        </div>
      </StationWrapper>
    </Root>
  )
}
