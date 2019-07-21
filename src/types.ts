export interface TripItem {
  bikeid: number
  birthYear: number
  endStationId: number
  endStationLatitude: number
  endStationLongitude: number
  endStationName: string
  gender: number
  startStationId: number
  startStationLatitude: number
  startStationLongitude: number
  startStationName: string
  starttime: string
  stoptime: string
  tripduration: 932
  usertype: string
}

export interface TripsData {
  [key: string]: TripItem
}

export type LngLat = [number, number]
