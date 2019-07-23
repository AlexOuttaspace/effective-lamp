import { TripsData, TripItem, LngLat } from 'src/types'

export const getTripStartCoords = ({
  startStationLongitude,
  startStationLatitude
}: TripItem): LngLat => [startStationLongitude, startStationLatitude]

export const getTripEndCoords = ({
  endStationLongitude,
  endStationLatitude
}: TripItem): LngLat => [endStationLongitude, endStationLatitude]

export const calcMapBounds = (trips: TripsData) => {
  const tripsArray = Object.values(trips)

  if (tripsArray.length === 0) return

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
