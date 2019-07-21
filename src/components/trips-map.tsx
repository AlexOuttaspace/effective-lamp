import React from 'react'
import { styled } from 'linaria/react'
import ReactMapboxGl from 'react-mapbox-gl'

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiYWxleG91dHRhc3BhY2UiLCJhIjoiY2p5ZDI2bTRsMGQ5dzNjcW01azIxdGRiciJ9.CtlNSN-Vc6p-_HbAAj9zFQ'
})

const Root = styled.div`
  width: 500px;
  height: 500px;
`

export const TripsMap: React.FC = () => (
  <Root style={{ height: 300 }}>
    <Map
      containerStyle={{
        height: '100%',
        width: '100%'
      }}
      style="mapbox://styles/mapbox/streets-v8" // eslint-disable-line react/style-prop-object
    />
  </Root>
)
